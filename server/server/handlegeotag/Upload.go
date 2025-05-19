package handlegeotag

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
)

func UploadImg(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(10 << 20) // 10 MB max file size
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	file, handler, err := r.FormFile("UploadImg")
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Create the output file
	outputFile, err := os.Create("./geotagimage/" + handler.Filename)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer outputFile.Close()

	// Copy the uploaded file to the destination
	_, err = io.Copy(outputFile, file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Prepare the JSON response
	response := map[string]interface{}{
		"status":   "success",
		"message":  "Image uploaded successfully",
		"filename": handler.Filename,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response) // Encode the response as JSON
}
