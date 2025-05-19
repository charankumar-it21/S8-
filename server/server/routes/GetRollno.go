package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"

)

type MentorIDRequest struct {
	MentorID string `json:"mentor_id"`
}

func GetAllStudentsRollno(w http.ResponseWriter, r *http.Request) {

	query := `
		SELECT rollno FROM student_details;
	`
	var rollNos [] string

	rows, err := config.Database.Query(query)
	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}
	defer rows.Close() 

	for rows.Next() {
		var roll_no string
		if err := rows.Scan(&roll_no); err != nil {
			http.Error(w, "Error reading data from database", http.StatusInternalServerError)
			fmt.Println("Error reading data from database:", err)
			return
		}
		rollNos = append(rollNos, roll_no)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error fetching data from database", http.StatusInternalServerError)
		fmt.Println("Row iteration error:", err)
		return
	}

	response := struct {
		OverallStudentRollNos []string `json:"roll_no"`
	}{
		OverallStudentRollNos: rollNos,
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
		return
	}
}


func GetStudentsRollnoByMentor(w http.ResponseWriter, r *http.Request) {
	var req MentorIDRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid JSON input", http.StatusBadRequest)
		return
	}

	
	if req.MentorID == "" {
		http.Error(w, "mentor_id is required", http.StatusBadRequest)
		return
	}

	query := `
		SELECT rollno FROM student_details WHERE mentor_id = ?;
	`
	var rollNos []string

	rows, err := config.Database.Query(query, req.MentorID)
	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var roll_no string
		if err := rows.Scan(&roll_no); err != nil {
			http.Error(w, "Error reading data from database", http.StatusInternalServerError)
			fmt.Println("Error reading data from database:", err)
			return
		}
		rollNos = append(rollNos, roll_no)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error fetching data from database", http.StatusInternalServerError)
		fmt.Println("Row iteration error:", err)
		return
	}

	// Response JSON
	response := struct {
		StudentRollNos []string `json:"roll_no"`
	}{
		StudentRollNos: rollNos,
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
	}
}
