package routes

import (
	"fmt"
	"log"
	"net/smtp"
	"server/config"
	
)

// Function to fetch weekly attendance details
func getWeeklyAttendance() ([]map[string]string, error) {
	// weekAgo := time.Now().AddDate(0, 0, -7).Format("2006-01-02")

	query := `
		SELECT 
			sd.rollno, sd.name, sd.parent_email, 
			ad.attendace_percentage, ad.no_of_days_present, 
			ad.no_of_days_absent, ad.total_working_days 
		FROM attendace_data ad
		JOIN student_details sd ON ad.roll_no = sd.rollno
		
	`
	rows, err := config.Database.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var attendanceRecords []map[string]string
	for rows.Next() {
		var rollNo, studentName, parentEmail string
		var attendancePercentage, daysPresent, daysAbsent, totalWorkingDays float64

		if err := rows.Scan(&rollNo, &studentName, &parentEmail, &attendancePercentage, &daysPresent, &daysAbsent, &totalWorkingDays); err != nil {
			return nil, err
		}

		attendanceRecords = append(attendanceRecords, map[string]string{
			"roll_no":               rollNo,
			"name":                  studentName,
			"email":                 parentEmail,
			"attendance_percentage": fmt.Sprintf("%.2f", attendancePercentage),
			"days_present":          fmt.Sprintf("%.0f", daysPresent),
			"days_absent":           fmt.Sprintf("%.0f", daysAbsent),
			"total_days":            fmt.Sprintf("%.0f", totalWorkingDays),
		})
	}
	return attendanceRecords, nil
}

// Function to send an email
func sendAttendanceEmail(to, subject, body string) error {
	from := "hardeepm23504@gmail.com"  
	password := "heza phuo hrup zllq" 
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	auth := smtp.PlainAuth("", from, password, smtpHost)

	msg := []byte(
		"From: " + from + "\r\n" +
			"To: " + to + "\r\n" +
			"Subject: " + subject + "\r\n" +
			"Content-Type: text/plain; charset=UTF-8\r\n\r\n" +
			body + "\r\n")

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, msg)
	return err
}

// Weekly job to send attendance reports
func WeeklyAttendanceEmailJob() {
	attendanceRecords, err := getWeeklyAttendance()
	if err != nil {
		log.Println("Error fetching attendance data:", err)
		return
	}

	for _, record := range attendanceRecords {
		emailBody := fmt.Sprintf(
			"Dear Parent,\n\n"+
				"Attendance Report for your child:\n"+
				"Roll No: %s\n"+
				"Name: %s\n"+
				"Attendance Percentage: %s%%\n"+
				"Days Present: %s\n"+
				"Days Absent: %s\n"+
				"Total Working Days: %s\n\n"+
				"Please ensure regular attendance for better academic performance.\n\n"+
				"Best Regards,\n College Administration",
			record["roll_no"], record["name"], record["attendance_percentage"],
			record["days_present"], record["days_absent"], record["total_days"],
		)

		err := sendAttendanceEmail(record["email"], "Weekly Attendance Report", emailBody)
		if err != nil {
			log.Println("Error sending email to", record["email"], ":", err)
		} else {
			log.Println("Attendance report sent to:", record["email"])
		}
	}
}