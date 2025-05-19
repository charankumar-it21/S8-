package routes

import (
	"fmt"
	"log"
	"net/smtp"
	"server/config"
	"time"
)

// Function to fetch new achievements from the past week
func getNewAchievements() ([]map[string]string, error) {
	weekAgo := time.Now().AddDate(0, 0, -7).Format("2006-01-02")

	query := `
		SELECT sa.roll_no, sa.student_name, sa.event_name, sa.event_category, 
		       sa.event_description, sa.from_date, sa.to_date, 
		       sa.participation_status, sa.level_of_participation, sd.parent_email
		FROM manage_achievements sa
		JOIN student_details sd ON sa.roll_no = sd.rollno
		WHERE sa.created_at >= ?
	`
	rows, err := config.Database.Query(query, weekAgo)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var achievements []map[string]string
	for rows.Next() {
		var rollNo, studentName, eventName, eventCategory, eventDescription string
		var fromDate, toDate, participationStatus, level, parentEmail string

		if err := rows.Scan(&rollNo, &studentName, &eventName, &eventCategory, &eventDescription,
			&fromDate, &toDate, &participationStatus, &level, &parentEmail); err != nil {
			return nil, err
		}

		achievements = append(achievements, map[string]string{
			"roll_no":            rollNo,
			"student_name":       studentName,
			"event":              eventName,
			"category":           eventCategory,
			"description":        eventDescription,
			"from_date":          fromDate,
			"to_date":            toDate,
			"participation":      participationStatus,
			"level":              level,
			"email":              parentEmail,
		})
	}
	return achievements, nil
}

// Function to send an email
func sendEmail(to, subject, body string) error {
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

// Cron job to send weekly achievement emails
func WeeklyEmailJob() {
	achievements, err := getNewAchievements()
	if err != nil {
		log.Println("Error fetching achievements:", err)
		return
	}

	for _, ach := range achievements {
		emailBody := fmt.Sprintf(
			"Dear Parent,\n\n"+
				"We are pleased to inform you that your child %s (Roll No: %s) has participated in the following event:\n\n"+
				"Event Name: %s\n"+
				"Category: %s\n"+
				"Description: %s\n"+
				"Duration: %s to %s\n"+
				"Participation Status: %s\n"+
				"Level of Participation: %s\n\n"+
				"Congratulations on their achievement!\n\n"+
				"Best Regards,\n College Administration",
			ach["student_name"], ach["roll_no"], ach["event"], ach["category"],
			ach["description"], ach["from_date"], ach["to_date"],
			ach["participation"], ach["level"],
		)

		err := sendEmail(ach["email"], "Your Child's Achievement Update", emailBody)
		if err != nil {
			log.Println("Error sending email to", ach["email"], ":", err)
		} else {
			log.Println("Email sent to:", ach["email"])
		}
	}
}
