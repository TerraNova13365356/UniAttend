var user = [];
var pas = '';
var detected_user=true;
document.getElementById("login").addEventListener("click", async () => {
  var id = document.getElementById("Student/Faculty_Id").value.trim();
  pas = document.getElementById("password").value.trim();
  alert(id);

  if (datastud!= null && datastud.includes(id)) {
    alert("stud1");
    detected_user=true;
    await readData("Students/" + id);
    console.log(user);
  } else if (datafacul!=null && datafacul.includes(id)) {
    alert("kdkhvkfhdgkh");
    detected_user=false;
    await readData("Faculty/" + id);
  } else {
    alert("User Id Not Exist");
  }
});

window.onload = () => {
  checkuser("Faculty");
  checkuser("Students");

  console.log(datafacul);
  console.log(datastud);
};

var datafacul = null;
var datastud = null;

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

async function checkValueInDatabase(valueToCheck, path) {
  const ref = database.ref(path);
  try {
    const snapshot = await ref.orderByValue().equalTo(valueToCheck).once('value');
    return snapshot.exists();
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function readData(path) {
  try {
    const snapshot = await database.ref(path).once('value');
    user = Object.values(snapshot.val());
    alert(user[3]);
    if (detected_user==true) {
      if (pas === user[3]) {
        sessionStorage.setItem("USER", user[2]);
        location.replace("stud_home.html");
      } else {
        alert("Invalid Password!");
      }
    } else {
      if (pas === user[3]) {
        sessionStorage.setItem("USER", user[2]);
        sessionStorage.setItem("CODE", user[0]);
        location.replace("teachers_home.html");
      } else {
        alert("Invalid Password!");
      }
    }
  } catch (error) {
    console.error(error);
    alert("Something Went Wrong. Please Refresh the page");
  }
}

async function checkuser(path) {
  const reference = database.ref(path);
  try {
    const snapshot = await reference.once('value');
    const keys = Object.keys(snapshot.val());
    if (path === "Faculty") {
      datafacul = keys;
    } else {
      datastud = keys;
    }
  } catch (error) {
    console.error(error);
    if (path === "Faculty") {
      datafacul = null;
    } else {
      datastud = null;
    }
  }
}
