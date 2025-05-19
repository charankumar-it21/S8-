package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	"server/models"
)

func GetAttendance(w http.ResponseWriter, r *http.Request) {
	var attendance []models.Attendance

	rows, err := config.Database.Query("SELECT roll_no,attendace_percentage,no_of_days_present,no_of_days_absent,total_working_days FROM attendace_data")
	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var att models.Attendance
		err := rows.Scan(&att.RollNo, &att.AttendancePercent, &att.NoofDayspresent, &att.NoofDaysabsent, &att.TotalWorkingDays)
		if err != nil {
			http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
			fmt.Println("Database query error:", err)
			return
		}
		attendance = append(attendance, att)
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(attendance)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
		return
	}
}

func AddAttendanceData(w http.ResponseWriter,r *http.Request){
	var attendance []models.Attendance

	err := json.NewDecoder(r.Body).Decode(&attendance)
	if err != nil {
		http.Error(w,"Unable to decode JSON",http.StatusInternalServerError)
		fmt.Println("JSON decoding error:",err)
		return
	}

	stmt, err := config.Database.Prepare("INSERT INTO attendace_data (roll_no,attendace_percentage,no_of_days_present,no_of_days_absent,total_working_days) VALUES (?,?,?,?,?)")
	if err != nil {
		http.Error(w, "Database query preparation error", http.StatusInternalServerError)
		fmt.Println("Database preparation error:", err)
		return
	}
	defer stmt.Close()

	for _, s := range attendance {
		_, err = stmt.Exec(s.RollNo, s.AttendancePercent, s.NoofDayspresent, s.NoofDaysabsent, s.TotalWorkingDays)
		if err != nil {
			http.Error(w, "Failed to execute query", http.StatusInternalServerError)
			return
		}
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Attendance data added successfully"})
}