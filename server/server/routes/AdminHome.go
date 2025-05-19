package routes

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
)

func GetAdminHomeData(w http.ResponseWriter, r *http.Request) {
	query := `
		SELECT 
    SUM(CASE WHEN YEAR = 'IV Year' THEN 1 ELSE 0 END) AS fourth_years,
    SUM(CASE WHEN YEAR = 'III Year' THEN 1 ELSE 0 END) AS third_years,
    SUM(CASE WHEN YEAR = 'II Year' THEN 1 ELSE 0 END) AS second_years,
    SUM(CASE WHEN YEAR = 'I Year' THEN 1 ELSE 0 END) AS first_years
	FROM student_details;
	`

	var fourth_years, third_years, second_years, first_years int

	err := config.Database.QueryRow(query).Scan(&fourth_years, &third_years, &second_years, &first_years)
	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}

	response := struct {
		FourthYears int `json:"fourth_years"`
		ThirdYears  int `json:"third_years"`
		SecondYears int `json:"second_years"`
		FirstYears  int `json:"first_years"`
	}{
		FourthYears: fourth_years,
		ThirdYears:  third_years,
		SecondYears: second_years,
		FirstYears:  first_years,
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
		return
	}
}

func GetAdminHomeAcademicData(w http.ResponseWriter, r *http.Request) {
	query := `
		SELECT 
			SUM(CASE WHEN sd.YEAR = 'I Year' AND ad.cgpa > 8.0 THEN 1 ELSE 0 END) AS first_year_above_8,
			SUM(CASE WHEN sd.YEAR = 'I Year' AND ad.cgpa < 8.0 THEN 1 ELSE 0 END) AS first_year_below_8,
			SUM(CASE WHEN sd.YEAR = 'II Year' AND ad.cgpa > 8.0 THEN 1 ELSE 0 END) AS second_year_above_8,
			SUM(CASE WHEN sd.YEAR = 'II Year' AND ad.cgpa < 8.0 THEN 1 ELSE 0 END) AS second_year_below_8,
			SUM(CASE WHEN sd.YEAR = 'III Year' AND ad.cgpa > 8.0 THEN 1 ELSE 0 END) AS third_year_above_8,
			SUM(CASE WHEN sd.YEAR = 'III Year' AND ad.cgpa < 8.0 THEN 1 ELSE 0 END) AS third_year_below_8,
			SUM(CASE WHEN sd.YEAR = 'IV Year' AND ad.cgpa > 8.0 THEN 1 ELSE 0 END) AS fourth_year_above_8,
			SUM(CASE WHEN sd.YEAR = 'IV Year' AND ad.cgpa < 8.0 THEN 1 ELSE 0 END) AS fourth_year_below_8
		FROM student_details sd
		INNER JOIN academic_data ad ON ad.roll_no = sd.rollno;
	`

	var firstYearAbove8, firstYearBelow8 int
	var secondYearAbove8, secondYearBelow8 int
	var thirdYearAbove8, thirdYearBelow8 int
	var fourthYearAbove8, fourthYearBelow8 int

	err := config.Database.QueryRow(query).Scan(
		&firstYearAbove8, &firstYearBelow8,
		&secondYearAbove8, &secondYearBelow8,
		&thirdYearAbove8, &thirdYearBelow8,
		&fourthYearAbove8, &fourthYearBelow8,
	)
	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}

	response := struct {
		FirstYearAbove8  int `json:"first_year_above_8"`
		FirstYearBelow8  int `json:"first_year_below_8"`
		SecondYearAbove8 int `json:"second_year_above_8"`
		SecondYearBelow8 int `json:"second_year_below_8"`
		ThirdYearAbove8  int `json:"third_year_above_8"`
		ThirdYearBelow8  int `json:"third_year_below_8"`
		FourthYearAbove8 int `json:"fourth_year_above_8"`
		FourthYearBelow8 int `json:"fourth_year_below_8"`
	}{
		FirstYearAbove8:  firstYearAbove8,
		FirstYearBelow8:  firstYearBelow8,
		SecondYearAbove8: secondYearAbove8,
		SecondYearBelow8: secondYearBelow8,
		ThirdYearAbove8:  thirdYearAbove8,
		ThirdYearBelow8:  thirdYearBelow8,
		FourthYearAbove8: fourthYearAbove8,
		FourthYearBelow8: fourthYearBelow8,
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
		return
	}
}


func GetAdminDepartmentWiseStats(w http.ResponseWriter, r *http.Request){
	query := `SELECT department, COUNT(*) AS total_students FROM student_details GROUP BY department`

	rows, err := config.Database.Query(query)

	if err != nil {
		http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
		fmt.Println("Database query error:", err)
		return
	}

	var department, total_students string
	var departmentWiseStats []map[string]string
	
	for rows.Next() {
		err = rows.Scan(&department, &total_students)
		if err != nil {
			http.Error(w, "Unable to fetch data from database", http.StatusInternalServerError)
			fmt.Println("Database query error:", err)
			return
		}
		departmentWiseStats = append(departmentWiseStats, map[string]string{
			"department": department,
			"total_students": total_students,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(departmentWiseStats)
	if err != nil {
		http.Error(w, "Error encoding data to JSON", http.StatusInternalServerError)
		fmt.Println("JSON encoding error:", err)
		return
	}
	
}