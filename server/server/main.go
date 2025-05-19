package main

import (
	"fmt"
	"log"
	"net/http"
	"server/config"
	"server/handlecertificate"
	"server/handlegeotag"
	"server/handlereport"
	"server/handlers"
	"server/middleware"
	"server/routes"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/robfig/cron/v3"
	"github.com/rs/cors"
)

func main() {
	config.ConnectDB()
	defer config.Database.Close()

	// Schedule the weekly email job
	startCronJobs()

	// Setting up the router
	router := mux.NewRouter()
	router.HandleFunc("/signin", handlers.Signin).Methods("POST")

	protected := router.PathPrefix("/protected").Subrouter()
	protected.Use(middleware.AuthMiddleware)

	protected.HandleFunc("/admin-home-card-data", routes.GetAdminHomeData).Methods("GET")
	protected.HandleFunc("/admin-academic-card-data", routes.GetAdminHomeAcademicData).Methods("GET")
	protected.HandleFunc("/admin-department-stats", routes.GetAdminDepartmentWiseStats).Methods("GET")
	protected.HandleFunc("/get-users", routes.GetUsers).Methods("GET")
	protected.HandleFunc("/update-users", routes.UpdateUsers).Methods("POST")
	protected.HandleFunc("/add-users", routes.Addnewuser).Methods("POST")
	protected.HandleFunc("/get-mentors", routes.GetMentorDetails).Methods("GET")
	protected.HandleFunc("/add-mentors", routes.AddMentor).Methods("POST")
	
	protected.HandleFunc("/get-students", routes.GetStudents).Methods("GET")
	protected.HandleFunc("/add-students", routes.AddStudents).Methods("POST")
	protected.HandleFunc("/get-academic-data", routes.GetAcademicData).Methods("GET")
	protected.HandleFunc("/add-academic-data", routes.AddAcademicData).Methods("POST")
	protected.HandleFunc("/get-attendance", routes.GetAttendance).Methods("GET")
	protected.HandleFunc("/add-attendance", routes.AddAttendanceData).Methods("POST")
	protected.HandleFunc("/get-achievements", routes.GetAchievements).Methods("GET")
	protected.HandleFunc("/get-grades", routes.GetGrades).Methods("GET")
	protected.HandleFunc("/add-grades", routes.AddGrades).Methods("POST")
	protected.HandleFunc("/get-achievements-charts-data", routes.GetStudentAchievementsChartdata).Methods("POST")
	protected.HandleFunc("/get-allrollno", routes.GetAllStudentsRollno).Methods("GET")
	protected.HandleFunc("/get-mentorwise-rollno", routes.GetStudentsRollnoByMentor).Methods("POST")
	protected.HandleFunc("/get-achievement-details", routes.GetStudentAchievementsDetails).Methods("POST")
	protected.HandleFunc("/get-academic-card-data", routes.GetAcademicCardData).Methods("POST")
	protected.HandleFunc("/get-sgpa-stats", routes.GetSGPAStats).Methods("POST")
	protected.HandleFunc("/get-result-data", routes.GetSubjectData).Methods("POST")
	protected.HandleFunc("/get-mentor-student-data", routes.GetMentorStudentData).Methods("POST")
	protected.HandleFunc("/get-all-student-data", routes.GetAllStudentData).Methods("GET")
	protected.HandleFunc("/get-student-profile-data", routes.GetStudentProfiles).Methods("POST")
	protected.HandleFunc("/get-student-card-data", routes.GetStudentCardData).Methods("POST")
	protected.HandleFunc("/get-student-attendance", routes.GetStudentAttendanceData).Methods("POST")
	protected.HandleFunc("/get-student-profile-datas", routes.GetStudentProfiledata).Methods("POST")
	protected.HandleFunc("/get-student-academic-data", routes.GetAcademicStudentCardData).Methods("POST")
	protected.HandleFunc("/upload-geotag-image", handlegeotag.UploadImg).Methods("POST")
	router.HandleFunc("/serve-geotag-image/{filename}", handlegeotag.ServeImage).Methods("GET")
	protected.HandleFunc("/upload-certificate", handlecertificate.UploadPDF).Methods("POST")
	router.HandleFunc("/serve-certificate/{filename}", handlecertificate.ServePDF).Methods("GET")
	protected.HandleFunc("/upload-report", handlereport.UploadPDF).Methods("POST")
	router.HandleFunc("/serve-report/{filename}", handlereport.ServePDF).Methods("GET")
	protected.HandleFunc("/get-achievents-details", routes.GetAchievementsdetails).Methods("GET")
	protected.HandleFunc("/handle-approval", routes.HandleApproval).Methods("POST")
	protected.HandleFunc("/handle-rejection", routes.HandleRejection).Methods("POST")
	protected.HandleFunc("/add-new-achievements-details", routes.AddnewStudentachievements).Methods("POST")
	protected.HandleFunc("/add-achievements", routes.AddAchievements).Methods("POST")
	protected.HandleFunc("/send-achievements-alerts", func(w http.ResponseWriter, r *http.Request) {
		routes.WeeklyEmailJob()
	}).Methods("GET")
	protected.HandleFunc("/send-attendance-alerts", func(w http.ResponseWriter, r *http.Request) {
		routes.WeeklyAttendanceEmailJob()
	}).Methods("GET")

	c := cors.AllowAll()

	// Start the server
	fmt.Println("Server is running on port 8080")
	err := http.ListenAndServe(":8080", c.Handler(router))
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

// Function to start the cron job
func startCronJobs() {
	c := cron.New()

	// Run every Monday at 8 AM
	_, err := c.AddFunc("0 8 * * MON", func() {
		fmt.Println("Running Weekly Email Job at:", time.Now())
		routes.WeeklyEmailJob()
		routes.WeeklyAttendanceEmailJob()
	})

	if err != nil {
		log.Fatalf("Error scheduling cron job: %v", err)
	}

	c.Start()
}
