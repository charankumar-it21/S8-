package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"
)

func GetStudents(w http.ResponseWriter,r *http.Request){
	var students []models.Students

	rows,err := config.Database.Query("SELECT rollno,NAME,email,department,YEAR,current_sem,parent_name,parent_email,parent_phoneno,mentor_id FROM student_details")
	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}

	defer rows.Close()

	for rows.Next(){
		var student models.Students
		err := rows.Scan(&student.Rollno,&student.Name,&student.Email,&student.Department,&student.Year,&student.CurrentSem,&student.ParentName,&student.ParentEmail,&student.ParentPhone,&student.MentorID)
		if err != nil {
			http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
			fmt.Println("Database query error:",err)
			return
		}
		students = append(students,student)
	}

	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(students)
	if err != nil {
		http.Error(w,"Error encoding data to JSON",http.StatusInternalServerError)
		fmt.Println("JSON encoding error:",err)
		return
	}
}

func AddStudents(w http.ResponseWriter,r *http.Request){
	var student []models.Students

	err := json.NewDecoder(r.Body).Decode(&student)
	if err != nil {
		http.Error(w,"Unable to decode JSON",http.StatusInternalServerError)
		fmt.Println("JSON decoding error:",err)
		return
	}

	stmt, err := config.Database.Prepare("INSERT INTO student_details (rollno,NAME,email,department,YEAR,current_sem,parent_name,parent_email,parent_phoneno,mentor_id) VALUES (?,?,?,?,?,?,?,?,?,?)")
	if err != nil {
		http.Error(w, "Database query preparation error", http.StatusInternalServerError)
		fmt.Println("Database preparation error:", err)
		return
	}
	defer stmt.Close()

	for _,student := range student {
		_,err := stmt.Exec(student.Rollno,student.Name,student.Email,student.Department,student.Year,student.CurrentSem,student.ParentName,student.ParentEmail,student.ParentPhone,student.MentorID)
		if err != nil {
			http.Error(w,"Unable to insert data into database",http.StatusInternalServerError)
			fmt.Println("Database query error:",err)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message":"Student data added successfully"})
}