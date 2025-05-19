package handlereport

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

func UploadPDF(w http.ResponseWriter, r *http.Request) {

	err := r.ParseMultipartForm(10 << 20) // 10 MB max file size
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	file, handler, err := r.FormFile("UploadReportFiles")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	if filepath.Ext(handler.Filename) != ".pdf" {
		http.Error(w, "Invalid file type. Only PDF files are allowed.", http.StatusUnsupportedMediaType)
		return
	}

	outputFile, err := os.Create("./documents/" + handler.Filename)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer outputFile.Close()

	_, err = io.Copy(outputFile, file)
	if err != nil {
		http.Error(w, "Failed to save the file", http.StatusInternalServerError)
		return
	}
	response := map[string]interface{}{
		"status":  "success",
		"message": "PDF uploaded successfully",
		"filename": handler.Filename,
	}
	// Send a success response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
