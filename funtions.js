
const firebaseConfig = {
  apiKey: "AIzaSyAezlERFuTqaUPqCqDcy9IV1sF_zM6y0sE",
  authDomain: "attend-5b75d.firebaseapp.com",
  databaseURL: "https://attend-5b75d-default-rtdb.firebaseio.com",
  projectId: "attend-5b75d",
  storageBucket: "attend-5b75d.appspot.com",
  messagingSenderId: "242208955570",
  appId: "1:242208955570:web:ebc282c57948c3f59a3dab"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();



//============================create data======================================

function createData(data, path) {
  const reference = database.ref(path);
  reference.set(data).then(() => {
    console.log("Data created successfully!");
  })
    .catch((error) => {
      console.error("Error creating data:", error);
    });;
}



// createData(newData, "users/user1")




//---------------------------read----------------------------------------
function readData(path) {
  const reference = database.ref(path);
  reference.once('value').then((snapshot) => {
    console.log(Object.values(snapshot.val()));
  })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
}





//-----------------------------update--------------------------------------
function updateData(data, path) {
  const reference = database.ref(path);
  reference.update(data).then(() => {
    console.log("Data updated successfully!");
  })
    .catch((error) => {
      console.error("Error updating data:", error);
    });;
}






//-----------------------------delete-----------------------------------
function deleteData(path) {
  const reference = database.ref(path);
  reference.remove().then(() => {
    console.log("Data deleted successfully!");
  })
    .catch((error) => {
      console.error("Error deleting data:", error);
    });;
}

// deleteData("users/user1")


//------------------------------------------upload document---------------------------------


//--------------------------------------------retrieve document---------------------------
function retrievePDF(path) {

  const reference = storageRef.child(path);

  reference.getDownloadURL()
    .then((url) => {
      // Create a new link element
      const link = document.createElement('a');

      link.href = url;
      console.log(link);
      link.download = 'myfile.pdf'; // Set the desired download filename
      link.click();
    })
    .catch((error) => {
      console.error('Error getting download URL:', error);
    });
}

const path = 'uploads/utilities.css'; // Replace with the path of the uploaded PDF




const file = document.getElementById('fileInput').files[0];

