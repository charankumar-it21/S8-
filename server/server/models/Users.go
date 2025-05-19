package models

type Users struct {
	UserID   string `json:"user_id"`
	Username string `json:"user_name"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}
