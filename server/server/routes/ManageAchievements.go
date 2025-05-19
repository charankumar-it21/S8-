package routes

import(
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"

)

type AchievementId struct {
	AchievementID string `json:"achievement_id"`
}

func GetAchievements(w http.ResponseWriter,r *http.Request){

	var achievements []models.Achievements

	rows,err := config.Database.Query("SELECT roll_no,achievement_name,category,description,award_level,date_awarded FROM achievements_details")
	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}

	defer rows.Close()

	for rows.Next(){
		var achievement models.Achievements
		err := rows.Scan(&achievement.RollNo,&achievement.Title,&achievement.Category,&achievement.Description,&achievement.Prizelevel,&achievement.Dateofaward)
		if err != nil {
			http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
			fmt.Println("Database query error:",err)
			return
		}
		achievements = append(achievements,achievement)
	}

	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(achievements)
	if err != nil {
		http.Error(w,"Error encoding data to JSON",http.StatusInternalServerError)
		fmt.Println("JSON encoding error:",err)
		return
	}

}

func AddAchievements(w http.ResponseWriter,r *http.Request){
	var achievement []models.Achievements

	err := json.NewDecoder(r.Body).Decode(&achievement)
	if err != nil {
		http.Error(w,"Unable to decode JSON",http.StatusInternalServerError)
		fmt.Println("JSON decoding error:",err)
		return
	}

	stmt, err := config.Database.Prepare("INSERT INTO achievements_details (roll_no,achievement_name,category,description,award_level,date_awarded) VALUES (?,?,?,?,?,?)")
	if err != nil {
		http.Error(w, "Database query preparation error", http.StatusInternalServerError)
		fmt.Println("Database preparation error:", err)
		return
	}
	defer stmt.Close()

	for _, s := range achievement {
		_, err = stmt.Exec(s.RollNo,s.Title,s.Category,s.Description,s.Prizelevel,s.Dateofaward)
		if err != nil {
			http.Error(w, "Unable to insert data into database", http.StatusInternalServerError)
			fmt.Println("Database query error:", err)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Achievement details added successfully"})
}

func GetAchievementsdetails(w http.ResponseWriter, r *http.Request) {
	var achievements []models.ManageAchievements

	rows, err := config.Database.Query("SELECT achievement_id,roll_no, student_name, event_name, event_category, event_description, from_date, to_date, level_of_participation, participation_status, geo_tag, certificate_proof, document_proof, approval_status FROM manage_achievements")
	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var achievement models.ManageAchievements
		err := rows.Scan(&achievement.AchievementID,
			&achievement.RollNo, &achievement.StudentName, &achievement.EventName,
			&achievement.EventCategory, &achievement.EventDescription, &achievement.FromDate,
			&achievement.ToDate, &achievement.LevelOfParticipation, &achievement.ParticipationStatus,
			&achievement.GeoTag, &achievement.CertificateProof, &achievement.DocumentProof,
			&achievement.ApprovalStatus,
		)
		if err != nil {
			http.Error(w, "Unable to scan data", http.StatusInternalServerError)
			fmt.Println("Database scan error:", err)
			return
		}
		achievements = append(achievements, achievement)
	}

	if err = rows.Err(); err != nil {
		http.Error(w, "Error reading rows", http.StatusInternalServerError)
		fmt.Println("Rows iteration error:", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(achievements)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
		return
	}
}


func HandleApproval(w http.ResponseWriter, r *http.Request){
 	var req AchievementId

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w,"Invalid JSON input",http.StatusBadRequest)
		return
	}

	if req.AchievementID == "" {
		http.Error(w,"achievement_id is required",http.StatusBadRequest)
		return
	}

	stmt, err := config.Database.Prepare("UPDATE manage_achievements SET approval_status = '1' WHERE achievement_id = ?")
	if err != nil {
		http.Error(w, "Database query preparation error", http.StatusInternalServerError)
		fmt.Println("Database preparation error:", err)
		return
	}

	_, err = stmt.Exec(req.AchievementID)
	if err != nil {
		http.Error(w, "Unable to update data into database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Approval status updated successfully"})
}

func HandleRejection(w http.ResponseWriter,r *http.Request){
	var req AchievementId

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w,"Invalid JSON input",http.StatusBadRequest)
		return
	}

	if req.AchievementID == "" {
		http.Error(w,"achievement_id is required",http.StatusBadRequest)
		return
	}

	stmt, err := config.Database.Prepare("UPDATE manage_achievements SET approval_status = '2' WHERE achievement_id = ?")
	if err != nil {
		http.Error(w, "Database query preparation error", http.StatusInternalServerError)
		fmt.Println("Database preparation error:", err)
		return
	}

	_, err = stmt.Exec(req.AchievementID)
	if err != nil {
		http.Error(w, "Unable to update data into database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Approval status updated successfully"})
}

