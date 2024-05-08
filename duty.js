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
 
  document.getElementById("duty_submit").addEventListener("click", () => {
    // retrievePDF(path);
    const support_doc = document.getElementById('supportingDocuments').files[0];
     
    const name_ = document.getElementById("studentName").value;
    const id_ = document.getElementById("studentId").value;
    const date= document.getElementById("startDate").value;
    const code= document.getElementById("code").value.toUpperCase();

     const doc=support_doc
  
    const newDuty_data = {
      name: name_.toUpperCase(),
      date: date,
      id: id_,
      doc: support_doc.name,
      approved:false
    };
     
    createData(newDuty_data,"Duty/Status/Requests/"+code+"/"+id_+date);
    uploadPDF(support_doc);
          
  });




function createData(data, path) {
    const reference = database.ref(path);
    reference.set(data).then(() => {
      console.log("Data created successfully!");
      return true;
    })
      .catch((error) => {
        console.error("Error creating data:", error);
      });
      
  }

  const storageRef = firebase.storage().ref();


function uploadPDF(file) {

  const reference = storageRef.child('uploads/'+file.name);




  reference.put(file).on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload progress:', progress + '%');
    },
    (error) => {
      // Handle unsuccessful uploads
      console.error('Upload failed:', error);
    },
    () => {
      // Handle successful uploads
      console.log('Upload completed!');

    });
}