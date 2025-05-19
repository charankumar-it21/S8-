package models

type AcademicData struct {
	RollNo  string  `json:"roll_no"`
	Cgpa    float64 `json:"cgpa"`
	Sem1    float64 `json:"sem1"`
	Sem2    float64 `json:"sem2"`
	Sem3    float64 `json:"sem3"`
	Sem4    float64 `json:"sem4"`
	Sem5    float64 `json:"sem5"`
	Sem6    float64 `json:"sem6"`
	Sem7    float64 `json:"sem7"`
	Sem8    float64 `json:"sem8"`
	Arrears int     `json:"arrears"`
}

type AcademicCardData struct {
	Attendance      float64 `json:"attendace_percentage"`
	NoOfDaysPresent float64 `json:"no_of_days_present"`
	NoofDaysAbsent  float64 `json:"no_of_days_absent"`
	Cgpa            float64 `json:"cgpa"`
}

type StudentAcademicCard struct {
	CGPA    float64 `json:"cgpa"`
	Arrears float64 `json:"arrears"`
}
