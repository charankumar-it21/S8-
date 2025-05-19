package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"
)

func GetGrades(w http.ResponseWriter,r *http.Request){
	var grades []models.Grades

	rows,err := config.Database.Query("SELECT student_roll_no,semester,subject_code,subject_name,grade,exam_type,exam_status FROM grades_data")
	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}
	defer rows.Close()

	for rows.Next(){
		var grade models.Grades
		err := rows.Scan(&grade.Student_roll_no,&grade.Semester,&grade.SubjectCode,&grade.SubjectName,&grade.Grades,&grade.Exam_type,&grade.Exam_status)
		if err != nil {
			http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
			fmt.Println("Database query error:",err)
			return
		}
		grades = append(grades,grade)
	}

	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(grades)
	if err != nil {
		http.Error(w,"Error encoding data to JSON",http.StatusInternalServerError)
		fmt.Println("JSON encoding error:",err)
		return
	}
}

func AddGrades(w http.ResponseWriter,r *http.Request){
	var grades []models.Grades

	err := json.NewDecoder(r.Body).Decode(&grades)
	if err != nil {
		http.Error(w,"Unable to decode JSON",http.StatusInternalServerError)
		fmt.Println("JSON decoding error:",err)
		return
	}

	stmt, err := config.Database.Prepare("INSERT INTO grades_data (student_roll_no,semester,subject_code,subject_name,grade,exam_type,exam_status) VALUES (?,?,?,?,?,?,?)")
	if err != nil {
		http.Error(w,"Database query preparation error",http.StatusInternalServerError)
		fmt.Println("Database preparation error:",err)
		return
	}
	defer stmt.Close()

	for _, s := range grades {
		_, err := stmt.Exec(s.Student_roll_no,s.Semester,s.SubjectCode,s.SubjectName,s.Grades,s.Exam_type,s.Exam_status)
		if err != nil {
			http.Error(w,"Unable to insert data into database",http.StatusInternalServerError)
			fmt.Println("Database query error:",err)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message":"Grades added successfully"})
}