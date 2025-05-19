package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"
)

type Request struct {
	RollNo string `json:"roll_no"`
}

func GetAcademicCardData(w http.ResponseWriter, r *http.Request) {

	var req RollNoRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid JSON input", http.StatusBadRequest)
		return
	}

	if req.RollNo == "" {
		http.Error(w, "roll_no is required", http.StatusBadRequest)
		return
	}

	var academicData models.AcademicCardData

	query := `SELECT ad.attendace_percentage,ad.no_of_days_present,ad.no_of_days_absent,acd.cgpa FROM attendace_data ad INNER JOIN academic_data acd ON acd.roll_no=ad.roll_no WHERE acd.roll_no=?`

	row := config.Database.QueryRow(query, req.RollNo)

	err = row.Scan(&academicData.Attendance, &academicData.NoOfDaysPresent, &academicData.NoofDaysAbsent, &academicData.Cgpa)

	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(academicData)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
	}

}

func GetSGPAStats(w http.ResponseWriter, r *http.Request) {
	var req RollNoRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		http.Error(w, "Invalid JSON input", http.StatusBadRequest)
		return
	}

	if req.RollNo == "" {
		http.Error(w, "roll_no is required", http.StatusBadRequest)
		return
	}

	var sgpaStats models.CGPADATA

	query := `SELECT sem1,sem2,sem3,sem4,sem5,sem6,sem7,sem8 FROM academic_data WHERE roll_no=?`
	row := config.Database.QueryRow(query, req.RollNo)
	err = row.Scan(&sgpaStats.Sem1, &sgpaStats.Sem2, &sgpaStats.Sem3, &sgpaStats.Sem4, &sgpaStats.Sem5, &sgpaStats.Sem6, &sgpaStats.Sem7, &sgpaStats.Sem8)

	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(sgpaStats)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
	}

}

func GetSubjectData(w http.ResponseWriter,r *http.Request){
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

	var subjectData []models.GradesData
	query := `SELECT subject_code,subject_name,semester,grade,exam_status FROM grades_data WHERE student_roll_no=?`
	rows,err := config.Database.Query(query,req.RollNo)
	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}

	for rows.Next(){
		var data models.GradesData
		err = rows.Scan(&data.SubjectCode,&data.SubjectName,&data.Semester,&data.Grades,&data.Exam_status)
		if err != nil {
			http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
			fmt.Println("Database query error:",err)
			return
		}
		subjectData = append(subjectData,data)
	}

	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(subjectData)
	if err != nil {
		http.Error(w,"Error encoding data to JSON",http.StatusInternalServerError)
		fmt.Println("JSON encoding error:",err)
	}
}

func GetAcademicStudentCardData(w http.ResponseWriter,r *http.Request){
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

	var academicData models.StudentAcademicCard
	query := `SELECT CGPA,arrears FROM academic_data WHERE roll_no=?`
	row := config.Database.QueryRow(query,req.RollNo)
	err = row.Scan(&academicData.CGPA,&academicData.Arrears)
	if err != nil {
		http.Error(w,"Unable to fetch data from database",http.StatusInternalServerError)
		fmt.Println("Database query error:",err)
		return
	}

	w.Header().Set("Content-Type","application/json")
	err = json.NewEncoder(w).Encode(academicData)
	if err != nil {
		http.Error(w,"Error encoding data to JSON",http.StatusInternalServerError)
		fmt.Println("JSON encoding error:",err)
	}
}