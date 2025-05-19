package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []models.Users

	rows, err := config.Database.Query("SELECT user_id,user_name,email,ROLE FROM users_details")
	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var user models.Users
		err := rows.Scan(&user.UserID, &user.Username, &user.Email, &user.Role)
		if err != nil {
			http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
			fmt.Println("Database query error:", err)
			return
		}
		users = append(users, user)
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(users)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
		return
	}
}


func UpdateUsers(w http.ResponseWriter,r * http.Request){
	var user models.Users
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Unable to decode JSON", http.StatusInternalServerError)
		fmt.Println("JSON decoding error:", err)
		return
	}
	_, err = config.Database.Exec("UPDATE users_details SET ROLE=? WHERE user_id=?",user.Role, user.UserID)
	if err != nil {
		http.Error(w, "Unable to update data in database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "User role updated successfully"})
}

func Addnewuser(w http.ResponseWriter, r *http.Request) {
	var users []models.Users // Expecting an array of users

	err := json.NewDecoder(r.Body).Decode(&users)
	if err != nil {
		http.Error(w, "Unable to decode JSON", http.StatusInternalServerError)
		fmt.Println("JSON decoding error:", err)
		return
	}

	// Prepare SQL query to insert multiple users
	stmt, err := config.Database.Prepare("INSERT INTO users_details(user_id, user_name, email, ROLE) VALUES (?, ?, ?, ?)")
	if err != nil {
		http.Error(w, "Database query preparation error", http.StatusInternalServerError)
		fmt.Println("Database preparation error:", err)
		return
	}
	defer stmt.Close()

	// Insert each user into the database
	for _, user := range users {
		_, err := stmt.Exec(user.UserID, user.Username, user.Email, user.Role)
		if err != nil {
			http.Error(w, "Unable to add data in database", http.StatusInternalServerError)
			fmt.Println("Database query error:", err)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Users added successfully"})
}
