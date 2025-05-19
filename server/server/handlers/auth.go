package handlers

import (
	"server/config"
	"server/models"
	"database/sql"
	"encoding/json"
	"net/http"
	"time"

    "github.com/golang-jwt/jwt/v5"
)

var jwtSecretKey = []byte("student-activity-tracking-system")

func Signin(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Email string `json:"email"`
	}
	var dbUser models.Users
	err := json.NewDecoder(r.Body).Decode(&input)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	err = config.Database.QueryRow("SELECT user_id,user_name,email,ROLE FROM users_details WHERE email=?", input.Email).Scan(
		&dbUser.UserID, &dbUser.Username, &dbUser.Email, &dbUser.Role)

	if err == sql.ErrNoRows {
		http.Error(w, "Email not found", http.StatusUnauthorized)
		return
	} else if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": dbUser.UserID,
		"role":   dbUser.Role,
		"exp":    time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString(jwtSecretKey)
	if err != nil {
		http.Error(w, "Could not generate token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"token":      tokenString,
		"userID":     dbUser.UserID,
		"username":   dbUser.Username,
		"role":       dbUser.Role,
	})
}

