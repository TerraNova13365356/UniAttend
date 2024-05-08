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
  
  
  
  document.getElementById("submit").addEventListener("click", () => {
    // retrievePDF(path);
  
    const pass_ = document.getElementById("password").value;
    const name_ = document.getElementById("name").value;
    const con_pass_ = document.getElementById("confirm_password").value;
    const id_ = document.getElementById("id").value;
    const email_ = document.getElementById("email").value;
    const role_ = document.getElementById("role").value;
  
    const newStud_data = {
      name: name_,
      password: pass_,
      id: id_,
      email: email_,
    };
    const newfacul_data = {
      password: pass_,
      id: id_,
      email: email_,
      course_code:document.getElementById("course_code").value
    };
  
    if (pass_ == con_pass_) {
        if(role_=="faculty")
        {
          createData(newfacul_data,"Faculty/"+id_);
  
        }
        else{
          createData(newStud_data,"Students/"+id_);
        }
    }
    else {
      alert("password does not matching!");
    }
  
  
  });
  
  document.getElementById("role").addEventListener("change", () => {
   
    if (document.getElementById("role").value == "faculty") {
      document.getElementById("code").style.display = "block";
    }
    else{
      document.getElementById("code").style.display = "none";
    }
  })



  //============================create data======================================

function createData(data, path) {
    const reference = database.ref(path);
    reference.set(data).then(() => {
      console.log("Data created successfully!");
      alert("User created Successfully");
      history.back();
    })
      .catch((error) => {
        alert("SomeThing Went Wrong!");
      });;
  }