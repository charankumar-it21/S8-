package models

type Grades struct {
	Student_roll_no string `json:"student_roll_no"`
	Semester        string `json:"semester"`
	SubjectCode     string `json:"subject_code"`
	SubjectName     string `json:"subject_name"`
	Grades          string `json:"grades"`
	Exam_type       string `json:"exam_type"`
	Exam_status     string `json:"exam_status"`
}

type GradesData struct {
	SubjectCode string `json:"subject_code"`
	SubjectName string `json:"subject_name"`
	Semester    string `json:"semester"`
	Grades      string `json:"grades"`
	Exam_status string `json:"exam_status"`
}
