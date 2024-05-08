
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
var studentData=[];
window.onload=()=>{
   
  var code=sessionStorage.getItem("CODE");
   readData("Duty/Status/Requests/"+code);
}

var curr_stud=0;
var course_code=sessionStorage.getItem("CODE").toUpperCase();
//---------------------------read----------------------------------------
function readData(path) {
  const reference = database.ref(path);
  reference.once('value').then((snapshot) => {
    studentData=(Object.values(snapshot.val()));
    studentData.forEach(student => {
       
        const newSection = document.createElement("section");
      newSection.id = "requests"; // You can set a unique ID if needed
      newSection.className = "requests";
    
      // Create elements for name and date
      const newName = document.createElement("h2");
      const newDate = document.createElement("h2");
    
      // Set IDs for name and date elements (optional)
      newName.id = "stud_name";
      newDate.id = "req_date";
    
      // Set text content for name and date
      newName.textContent = student.name;
      newDate.textContent = student.date;
    
      // Create a button element (optional)
      const newButton = document.createElement("button");
      newButton.textContent = "Approve"; 
      newButton.setAttribute("id","approve");// Adjust button text as needed
    
      // Add functionality to the button (optional)
     
    
      // Append elements to the new section
      newSection.appendChild(newName);
      newSection.appendChild(newDate);
      if (newButton) { // Add button only if needed
        newSection.appendChild(newButton);
      }
    
      // Append the new section to the container element
      document.getElementById("inner").appendChild(newSection);
      
      // Create a new section element
      
    });

    var originalSection = document.getElementById("requests");
var right = document.getElementById("right");
var block = document.getElementById("block");
var stu_name = document.getElementById("student_name");
var stu_name = document.getElementById("student_name");
var stu_reg = document.getElementById("student_reg");
var stu_class = document.getElementById("student_class");
var stu_doc = document.getElementById("student_doc");


 // Your array of objects (replace with your actual data)
 
  
  // Container element where we'll add the sections (replace with your element ID)
  const containerElement = document.getElementById("requests_container");
  
  // Loop through the studentData array
  
  

const decisionButtons = document.querySelectorAll("#stud_name");
decisionButtons.forEach((button, index) => {
    button.addEventListener("click", function () {

        curr_stud=index;
        document.getElementById("block").style.display="none";
        document.getElementById("right").style.display="block";
        right.setAttribute("display","block");
        document.getElementById("student_name").innerText=studentData[index].name;
        document.getElementById("student_doc").innerText=studentData[index].doc;
        document.getElementById("student_reg").innerText=studentData[index].id;


    });
});
  })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
}
document.getElementById("approve_duty").addEventListener("click",()=>{ 
  deleteData("Duty/Status/Requests/"+course_code+"/"+studentData[curr_stud].id+studentData[curr_stud].date)
  createData({
    date:studentData[curr_stud].date,
    course_code:course_code,
    approved:"approved"},"Duty/Status/Approved/"+studentData[curr_stud].id+"/"+studentData[curr_stud].date);
  alert("Duty Leave Approved Successfully");
  
})


document.getElementById("approve_duty").addEventListener("click",()=>{ 
  deleteData("Duty/Status/Requests/"+course_code+"/"+studentData[curr_stud].id+studentData[curr_stud].date)
  createData({
    date:studentData[curr_stud].date,
    course_code:course_code,
    approved:"approved"},"Duty/Status/Approved/"+studentData[curr_stud].id+"/"+studentData[curr_stud].date);
  alert("Duty Leave Approved Successfully");

})

document.getElementById("decline_duty").addEventListener("click",()=>{ 
  document.getElementById("approve_duty").style.backgroundColor="red";
  createData({
    date:studentData[curr_stud].date,
    course_code:course_code,
    approved:"Decline"},"Duty/Status/Declined/"+studentData[curr_stud].id+"/"+studentData[curr_stud].date);
  deleteData("Duty/Status/Requests/"+course_code+"/"+studentData[curr_stud].id+studentData[curr_stud].date)
alert("Duty Leave Declined!");
  
})

document.getElementById("student_doc").addEventListener("click",()=>{
  retrievePDF("uploads/"+studentData[curr_stud].doc);
})


//--------------------------------------------retrieve document---------------------------
const storageRef = firebase.storage().ref();
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

//----------------------------create----------------------------
function createData(data, path) {
  const reference = database.ref(path);
  reference.set(data).then(() => {
    console.log("Data created successfully!");
    location.reload();
  })
    .catch((error) => {
      console.error("Error creating data:", error);
    });;
}
  

function update(){
  document.getElementById("inner").innerHTML="";

  studentData.forEach(student => {
       
    const newSection = document.createElement("section");
  newSection.id = "requests"; // You can set a unique ID if needed
  newSection.className = "requests";

  // Create elements for name and date
  const newName = document.createElement("h2");
  const newDate = document.createElement("h2");

  // Set IDs for name and date elements (optional)
  newName.id = "stud_name";
  newDate.id = "req_date";

  // Set text content for name and date
  newName.textContent = student.name;
  newDate.textContent = student.date;

  // Create a button element (optional)
  const newButton = document.createElement("button");
  newButton.textContent = "Approve"; 
  newButton.setAttribute("id","approve");// Adjust button text as needed

  // Add functionality to the button (optional)
 

  // Append elements to the new section
  newSection.appendChild(newName);
  newSection.appendChild(newDate);
  if (newButton) { // Add button only if needed
    newSection.appendChild(newButton);
  }

  // Append the new section to the container element
  document.getElementById("inner").appendChild(newSection);
  
  // Create a new section element
  
});
}




function hide(){
    document.getElementById("right").style.display="none";
}

