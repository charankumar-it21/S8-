package models

type Mentors struct {
	MentorID   string    `json:"faculty_id"`
	MentorName string `json:"name"`
	Department string `json:"department"`
	Email      string `json:"email"`
}