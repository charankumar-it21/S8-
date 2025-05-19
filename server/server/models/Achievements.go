package models

type Achievements struct {
	RollNo      string `json:"roll_no"`
	Title       string `json:"achievement_name"`
	Category    string `json:"category"`
	Description string `json:"description"`
	Prizelevel  string `json:"award_level"`
	Dateofaward string `json:"date_awarded"`
}

type AchievementsCardData struct {
	ProjectCount     int `json:"project_count"`
	CompetitionCount int `json:"competition_count"`
	TechnicalCount   int `json:"technical_count"`
	AcademicCount    int `json:"academic_count"`
	OtherCount       int `json:"other_count"`
}

type AchievementDetails struct {
	Rollno          string `json:"roll_no"`
	Name            string `json:"name"`
	Semester        string `json:"semester"`
	Department      string `json:"department"`
	Year            string `json:"year"`
	AchievementName string `json:"achievement_name"`
	Category        string `json:"category"`
	Description     string `json:"description"`
	AwardLevel      string `json:"award_level"`
	DateAwarded     string `json:"date_awarded"`
}

type ManageAchievements struct {
	AchievementID        string `json:"achievement_id"`
	RollNo               string `json:"roll_no"`
	StudentName          string `json:"student_name"`
	EventName            string `json:"event_name"`
	EventCategory        string `json:"event_category"`
	EventDescription     string `json:"event_description"`
	FromDate             string `json:"from_date"`
	ToDate               string `json:"to_date"`
	LevelOfParticipation string `json:"level_of_participation"`
	ParticipationStatus  string `json:"participation_status"`
	GeoTag               string `json:"geo_tag"`
	CertificateProof     string `json:"certificate_proof"`
	DocumentProof        string `json:"document_proof"`
	ApprovalStatus       string `json:"approval_status"`
}
