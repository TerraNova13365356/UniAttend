firebase.initializeApp(firebaseConfig);

// Get references to Firestore and Storage
const db = firebase.firestore();
const storage = firebase.storage();

// Function to upload a PDF file
function uploadPDF(fileName, fileData) {
  // Create a reference to the PDF in Storage
  const storageRef = storage.ref().child(`pdfs/${fileName}`);

  


  // Upload the file using putString
  return storageRef.putString(fileData, "data_url")
    .then(() => {
      console.log("PDF uploaded successfully!");
    })
    .catch((error) => {
      console.error("Error uploading PDF:", error);
    });
}

// Function to download a PDF file URL
async function downloadPDFURL(fileName) {
  // Get a reference to the PDF in Storage
  const storageRef = storage.ref().child(`pdfs/${fileName}`);

  try {
    const url = await storageRef.getDownloadURL();
    console.log("PDF download URL:", url);
    return url; // Return the download URL for further use
  } catch (error) {
    console.error("Error getting download URL:", error);
    return null; // Indicate error or handle it differently
  }
}

// Function to write data with PDF reference to Firestore
function writeData(collectionName, documentId, data, pdfFileName) {
  // Upload the PDF if provided
  if (pdfFileName && fileData) {
    uploadPDF(pdfFileName, fileData)
      .then(() => downloadPDFURL(pdfFileName)) // Get download URL after upload
      .then((pdfURL) => {
        // Update data object with PDF URL
        data.pdfURL = pdfURL;
        return db.collection(collectionName).doc(documentId).set(data);
      })
      .then(() => {
        console.log("Document written successfully!");
      })
      .catch((error) => {
        console.error("Error writing document:", error);
      });
  } else {
    // Write data without PDF (if no file provided)
    db.collection(collectionName).doc(documentId).set(data)
      .then(() => {
        console.log("Document written successfully!");
      })
      .catch((error) => {
        console.error("Error writing document:", error);
      });
  }
}

// Function to read data with PDF download logic (optional)
async function readData(collectionName, documentId) {
  return db.collection(collectionName).doc(documentId).get()
    .then((doc) =>{
      if (doc.exists) {
        const data = doc.data();
        if (data.pdfURL) {
          console.log("Document data:", data);
          // You can download the PDF using the URL (implement download logic here)
          const pdfURL = downloadPDFURL(data.pdfURL.split("/").pop()); // Extract filename from URL
          if (pdfURL) {
            // Handle successful download or display the URL for download (optional)
            console.log("PDF download URL:", pdfURL);
          }
        } else {
          console.log("Document data:", data); // Data without PDF
        }
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    });
}

// Example usage
const studentData = {
  name: "John Doe",
  class: "10th",
  // Add more fields as needed
};
const pdfFileName = "student_assignment.pdf"; // Replace with actual filename
const fileData = // File data obtained from user input (replace with your logic)

writeData("students", "123", studentData, pdfFileName);

