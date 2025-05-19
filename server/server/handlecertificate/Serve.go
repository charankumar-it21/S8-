package handlecertificate

import (
	"io"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
)

func ServePDF(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	pdfFileName := vars["filename"]

	pdfDir := "./certificates/"

	// Construct the full file path
	pdfPath := filepath.Join(pdfDir, pdfFileName)

	// Open the PDF file
	pdfFile, err := os.Open(pdfPath)
	if err != nil {
		http.Error(w, "PDF file not found", http.StatusNotFound)
		return
	}
	defer pdfFile.Close()

	// Set the content type for PDF files
	w.Header().Set("Content-Type", "application/pdf")

	// Copy the file content to the response
	_, err = io.Copy(w, pdfFile)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}
