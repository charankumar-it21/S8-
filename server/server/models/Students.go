package models

type Students struct {
	Rollno      string `json:"rollno"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Department  string `json:"department"`
	Year        string `json:"year"`
	CurrentSem  string `json:"current_sem"`
	ParentName  string `json:"parent_name"`
	ParentEmail string `json:"parent_email"`
	ParentPhone string `json:"parent_phoneno"`
	MentorID    string `json:"mentor_id"`
}

type StudentData struct {
	Rollno     string `json:"rollno"`
	Name       string `json:"name"`
	Department string `json:"department"`
}

type StudentProfileDatas struct {
	Rollno       string  `json:"rollno"`
	StudentName  string  `json:"student_name"`
	StudentEmail string  `json:"email"`
	Department   string  `json:"department"`
	Year         string  `json:"year"`
	CurrenSem    string  `json:"current_sem"`
	ParentName   string  `json:"parent_name"`
	ParenEmail   string  `json:"parent_email"`
	ParentPhone  string  `json:"parent_phoneno"`
	MentorID     string  `json:"faculty_id"`
	MentorName   string  `json:"mentor_name"`
	Arrears      float64 `json:"arrears"`
}



type StudentCardData struct {
	Rollno 		string `json:"rollno"`
	Name 		string `json:"name"`
	CurrenSem 	string `json:"current_sem"`
}

type StudentAttendanceData struct{
	AttendancePercent string `json:"attendace_percent"`
	No_of_days_present string `json:"no_of_days_present"`
	No_of_days_absent string `json:"no_of_days_absent"`
	Total_working_days string `json:"total_working_days"`
}

type StudentCompleteData struct {
	Rollno       string `json:"rollno"`
	Name         string `json:"name"`
	Email 	  string `json:"email"`
	Department  string `json:"department"`
	Year 	  string `json:"year"`
	ParentName string `json:"parent_name"`
	ParentEmail string `json:"parent_email"`
	ParentPhone string `json:"parent_phoneno"`
	FacultyID string `json:"faculty_id"`
	FacultyName string `json:"mentor_name"`
	MentorDepartment string `json:"mentor_department"`
	MentorEmail 	  string `json:"mentor_email"`
}