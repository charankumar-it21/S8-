package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"
)

type RequestStudent struct {
	RollNo string `json:"roll_no"`
}

func GetStudentCardData(w http.ResponseWriter,r*http.Request){
	var req RequestStudent

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w,"Invalid JSON input",http.StatusBadRequest)
		return
	}

	if req.RollNo == "" {
		http.Error(w,"roll_no is required",http.StatusBadRequest)
		return
	}

	var student models.StudentCardData

	query := `SELECT rollno,NAME,current_sem FROM student_details WHERE rollno =?`

	err = config.Database.QueryRow(query,req.RollNo).Scan(&student.Rollno,&student.Name,&student.CurrenSem)

	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}

	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(student)
	if err != nil {
		http.Error(w,"Error encoding data to JSON",http.StatusInternalServerError)
		fmt.Println("JSON encoding error:",err)
		return
	}
}

func GetStudentAttendanceData(w http.ResponseWriter,r *http.Request){
	var req RequestStudent

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w,"Invalid JSON input",http.StatusBadRequest)
		return
	}

	if req.RollNo == "" {
		http.Error(w,"roll_no is required",http.StatusBadRequest)
		return
	}

	var attendance models.StudentAttendanceData

	query := `SELECT attendace_percentage,no_of_days_present,no_of_days_absent,total_working_days FROM attendace_data WHERE roll_no=?`

	err = config.Database.QueryRow(query,req.RollNo).Scan(&attendance.AttendancePercent,&attendance.No_of_days_present,&attendance.No_of_days_absent,&attendance.Total_working_days)

	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}

	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(attendance)
	if err != nil {
		http.Error(w,"Error encoding data to JSON",http.StatusInternalServerError)
		fmt.Println("JSON encoding error:",err)
		return
	}

}

func GetStudentProfiledata(w http.ResponseWriter,r *http.Request){
	var req RequestStudent

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w,"Invalid JSON input",http.StatusBadRequest)
		return
	}
	
	if req.RollNo == "" {
		http.Error(w,"roll_no is required",http.StatusBadRequest)
		return
	}

	var profile models.StudentCompleteData

	query := `SELECT sd.rollno,sd.name,sd.email,sd.department,sd.year,sd.parent_name,sd.parent_email, sd.parent_phoneno,md.faculty_id,md.name AS mentor_name,md.department AS mentor_department,md.email AS mentor_email FROM student_details sd INNER JOIN mentors_details md 
	ON md.faculty_id=sd.mentor_id WHERE sd.rollno=?`

	err = config.Database.QueryRow(query,req.RollNo).Scan(&profile.Rollno,&profile.Name,&profile.Email,&profile.Department,&profile.Year,&profile.ParentName,&profile.ParentEmail,&profile.ParentPhone,&profile.FacultyID,&profile.FacultyName,&profile.MentorDepartment,&profile.MentorEmail)

	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}

	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(profile)
	if err != nil {
		http.Error(w,"Error encoding data to JSON",http.StatusInternalServerError)
		fmt.Println("JSON encoding error:",err)
		return
	}
	
}