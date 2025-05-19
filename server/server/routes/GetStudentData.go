package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"
)

type RequestMentor struct {
	Mentor_id string `json:"mentor_id"`
}

func GetMentorStudentData(w http.ResponseWriter, r *http.Request) {
	var req RequestMentor

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid JSON input", http.StatusBadRequest)
		return
	}

	if req.Mentor_id == "" {
		http.Error(w, "mentor_id is required", http.StatusBadRequest)
		return
	}

	var studentData []models.StudentData

	query := `SELECT rollno,NAME,department FROM student_details WHERE mentor_id=?`

	rows, err := config.Database.Query(query, req.Mentor_id)
	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}

	defer rows.Close()

	for rows.Next() {
		var student models.StudentData
		err := rows.Scan(&student.Rollno, &student.Name, &student.Department)
		if err != nil {
			http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
			fmt.Println("Database query error:", err)
			return
		}
		studentData = append(studentData, student)
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(studentData)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
		return
	}

}

func GetAllStudentData(w http.ResponseWriter,r *http.Request){
	var studentData []models.StudentData

	query := `SELECT rollno,NAME,department FROM student_details`

	rows,err := config.Database.Query(query)
	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}

	defer rows.Close()

	for rows.Next(){
		var student models.StudentData
		err := rows.Scan(&student.Rollno,&student.Name,&student.Department)
		if err != nil {
			http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
			fmt.Println("Database query error:",err)
			return
		}
		studentData = append(studentData,student)
	}

	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(studentData)
	if err != nil {
		http.Error(w,"Error encoding data to JSON",http.StatusInternalServerError)
		fmt.Println("JSON encoding error:",err)
		return
	}
}


type RequestRollno	struct{
	Rollno string `json:"roll_no"`
}

func GetStudentProfiles(w http.ResponseWriter,r *http.Request){
	var req RequestRollno

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w,"Invalid JSON input",http.StatusBadRequest)
		return
	}

	if req.Rollno == "" {
		http.Error(w,"roll_no is required",http.StatusBadRequest)
		return
	}

	var studentData models.StudentProfileDatas

	query :=`SELECT 
    sd.rollno, 
    sd.name AS student_name, 
    sd.email, 
    sd.department, 
    sd.year, 
    sd.current_sem, 
    sd.parent_name, 
    sd.parent_email, 
    sd.parent_phoneno, 
    md.faculty_id, 
    md.name AS mentor_name, 
    ad.arrears 
	FROM student_details sd 
	LEFT JOIN mentors_details md 
    ON md.faculty_id = sd.mentor_id 
	LEFT JOIN academic_data ad 
    ON ad.roll_no = sd.rollno  
	WHERE sd.rollno = ?
	`

	row := config.Database.QueryRow(query,req.Rollno)

	err = row.Scan(&studentData.Rollno,&studentData.StudentName,&studentData.StudentEmail,&studentData.Department,&studentData.Year,&studentData.CurrenSem,&studentData.ParentName,&studentData.ParenEmail,&studentData.ParentPhone,&studentData.MentorID,&studentData.MentorName,&studentData.Arrears)

	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}

	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(studentData)
	if err != nil {
		http.Error(w,"Error encoding data to JSON",http.StatusInternalServerError)
		fmt.Println("JSON encoding error:",err)
	}
}

