package routes

import (
	"encoding/json"
	"net/http"
	"server/config"
	"server/models"
	"log"
)

func GetAcademicData(w http.ResponseWriter, r *http.Request) {

	query := `SELECT roll_no,cgpa,sem1,sem2,sem3,sem4,sem5,sem6,sem7,sem8,arrears FROM academic_data `

	rows, err := config.Database.Query(query)
	if err != nil {
		http.Error(w, "Failed to execute query", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var students []models.AcademicData
	for rows.Next() {
		var student models.AcademicData
		if err := rows.Scan(&student.RollNo, &student.Cgpa, &student.Sem1, &student.Sem2, &student.Sem3, &student.Sem4, &student.Sem5, &student.Sem6, &student.Sem7, &student.Sem8, &student.Arrears); err != nil {
			http.Error(w, "Failed to scan row", http.StatusInternalServerError)
			return
		}
		students = append(students, student)
	}

	// Convert to JSON and send response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(students)
}

func AddAcademicData(w http.ResponseWriter, r *http.Request) {
	var student []models.AcademicData

	err := json.NewDecoder(r.Body).Decode(&student)
	if err != nil {
		http.Error(w, "Unable to decode JSON", http.StatusInternalServerError)
		return
	}

	stmt, err := config.Database.Prepare("INSERT INTO academic_data (roll_no, cgpa, sem1, sem2, sem3, sem4, sem5, sem6, sem7, sem8, arrears) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		log.Println("SQL Prepare Error:", err)
		http.Error(w, "Database query preparation error", http.StatusInternalServerError)
		return
	}

	defer stmt.Close()

	for _, s := range student {
		_, err = stmt.Exec(s.RollNo, s.Cgpa, s.Sem1, s.Sem2, s.Sem3, s.Sem4, s.Sem5, s.Sem6, s.Sem7, s.Sem8, s.Arrears)
		if err != nil {
			http.Error(w, "Failed to execute query", http.StatusInternalServerError)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Academic data added successfully"})
}
