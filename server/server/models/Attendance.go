package models

type Attendance struct {
	RollNo            string  `json:"roll_no"`
	AttendancePercent float64 `json:"attendance_percentage"`
	NoofDayspresent   float64 `json:"no_of_days_present"`
	NoofDaysabsent    float64 `json:"no_of_days_absent"`
	TotalWorkingDays  float64 `json:"total_working_days"`
}
