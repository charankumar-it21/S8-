package routes

import(
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"
	"strconv"
	"strings"
)

func AddnewStudentachievements(w http.ResponseWriter, r *http.Request) {
	var achievement models.ManageAchievements

	// Decode JSON from request
	err := json.NewDecoder(r.Body).Decode(&achievement)
	if err != nil {
		http.Error(w, "Unable to decode JSON", http.StatusBadRequest)
		fmt.Println("JSON decoding error:", err)
		return
	}

	var maxReqID string
	queryMax := "SELECT achievement_id FROM manage_achievements ORDER BY created_at DESC LIMIT 1"
	err = config.Database.QueryRow(queryMax).Scan(&maxReqID)
	if err != nil && err.Error() != "sql: no rows in result set" {
		http.Error(w, "Error retrieving the max achievement_id", http.StatusInternalServerError)
		fmt.Println("Database error:", err)
		return
	}

	// Generate new achievement ID
	newReqID := "AI-1" // Default if no records exist
	if maxReqID != "" {
		parts := strings.Split(maxReqID, "-")
		if len(parts) == 2 {
			num, convErr := strconv.Atoi(parts[1])
			if convErr == nil {
				newReqID = fmt.Sprintf("AI-%d", num+1)
			}
		}
	}

	// Prepare SQL statement
	stmt, err := config.Database.Prepare(`
        INSERT INTO manage_achievements 
        (achievement_id, roll_no, student_name, event_name, event_category, event_description, from_date, to_date, 
        level_of_participation, participation_status, geo_tag, certificate_proof, document_proof, approval_status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
	if err != nil {
		http.Error(w, "Database query preparation error", http.StatusInternalServerError)
		fmt.Println("Database preparation error:", err)
		return
	}
	defer stmt.Close()

	// Execute the query
	_, err = stmt.Exec(newReqID, achievement.RollNo, achievement.StudentName, achievement.EventName,
		achievement.EventCategory, achievement.EventDescription, achievement.FromDate, achievement.ToDate,
		achievement.LevelOfParticipation, achievement.ParticipationStatus, achievement.GeoTag,
		achievement.CertificateProof, achievement.DocumentProof, "0")

	if err != nil {
		http.Error(w, "Unable to insert data into database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}

	// Success response
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Achievement details added successfully"})
}