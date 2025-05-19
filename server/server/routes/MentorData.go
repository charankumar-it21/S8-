package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"
)

func GetMentorDetails(w http.ResponseWriter, r *http.Request) {
	var mentors []models.Mentors

	rows, err := config.Database.Query("SELECT faculty_id,name,department,email FROM mentors_details")
	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var mentor models.Mentors
		err := rows.Scan(&mentor.MentorID, &mentor.MentorName, &mentor.Department, &mentor.Email)
		if err != nil {
			http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
			fmt.Println("Database query error:", err)
			return
		}
		mentors = append(mentors, mentor)
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(mentors)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
		return
	}
}


func AddMentor(w http.ResponseWriter, r *http.Request) {
	var mentors []models.Mentors 

	err := json.NewDecoder(r.Body).Decode(&mentors)
	if err != nil {
		http.Error(w, "Unable to decode JSON", http.StatusInternalServerError)
		fmt.Println("JSON decoding error:", err)
		return
	}

	stmt, err := config.Database.Prepare("INSERT INTO mentors_details(faculty_id, name, department, email) VALUES (?, ?, ?, ?)")
	if err != nil {
		http.Error(w, "Database query preparation error", http.StatusInternalServerError)
		fmt.Println("Database preparation error:", err)
		return
	}
	defer stmt.Close()

	// Insert each mentor into the database
	for _, user := range mentors {
		_, err := stmt.Exec(user.MentorID, user.MentorName, user.Department, user.Email)
		if err != nil {
			http.Error(w, "Unable to add data to the database", http.StatusInternalServerError)
			fmt.Println("Database query error:", err)
			return
		}
	}

	// Success response
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Mentors added successfully"})
}
