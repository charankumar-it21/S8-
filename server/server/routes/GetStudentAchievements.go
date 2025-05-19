package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"
)

type RollNoRequest struct {
	RollNo string `json:"roll_no"`
}

func GetStudentAchievementsChartdata(w http.ResponseWriter, r *http.Request) {

	var req RollNoRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid JSON input", http.StatusBadRequest)
		return
	}

	// Validate roll_no
	if req.RollNo == "" {
		http.Error(w, "roll_no is required", http.StatusBadRequest)
		return
	}

	var achievement models.AchievementsCardData

	query := `SELECT 
    COALESCE(SUM(CASE WHEN category = 'Project' THEN 1 ELSE 0 END), 0) AS project_count,
    COALESCE(SUM(CASE WHEN category = 'Competition' THEN 1 ELSE 0 END), 0) AS competition_count,
    COALESCE(SUM(CASE WHEN category = 'Technical' THEN 1 ELSE 0 END), 0) AS technical_count,
    COALESCE(SUM(CASE WHEN category = 'Academic' THEN 1 ELSE 0 END), 0) AS academic_count,
    COALESCE(SUM(CASE WHEN category NOT IN ('Project', 'Competition','Technical','Academic') THEN 1 ELSE 0 END), 0) AS others_count
	FROM achievements_details 
	WHERE roll_no = ?;`

	// Execute query with roll_no as a parameter
	err = config.Database.QueryRow(query, req.RollNo).Scan(
		&achievement.ProjectCount,
		&achievement.CompetitionCount,
		&achievement.TechnicalCount,
		&achievement.AcademicCount,
		&achievement.OtherCount,
	)
	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(achievement)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
	}
}


func GetStudentAchievementsDetails(w http.ResponseWriter,r *http.Request){
	var req RollNoRequest

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w,"Invalid JSON input",http.StatusBadRequest)
		return
	}

	if req.RollNo == "" {
		http.Error(w,"roll_no is required",http.StatusBadRequest)
		return
	}

	var achievements []models.AchievementDetails

	query := `SELECT 
    ad.roll_no,
    sd.name,
    sd.current_sem,
    sd.department,
    sd.year,
    ad.achievement_name,
    ad.category,
    ad.description,
    ad.award_level,
    ad.date_awarded 
	FROM achievements_details ad 
	INNER JOIN student_details sd 
	ON sd.rollno = ad.roll_no 
	WHERE sd.rollno = ?
	`

	rows,err := config.Database.Query(query,req.RollNo)
	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}

	defer rows.Close()

	for rows.Next(){

		var achievement models.AchievementDetails
		err := rows.Scan(&achievement.Rollno,&achievement.Name,&achievement.Semester,&achievement.Department,&achievement.Year,&achievement.AchievementName,&achievement.Category,&achievement.Description,&achievement.AwardLevel,&achievement.DateAwarded)
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
	}


}