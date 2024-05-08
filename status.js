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
  var user_id="";
  const database = firebase.database();
  var approved=[];
  var decline=[];
  window.onload=()=>{
    user_id="CHN22BT109";
    ApprovereadData("Duty/Status/Approved/"+user_id);
    DeclinereadData("Duty/Status/Declined/"+user_id);

  }

  document.getElementById("Check").addEventListener("click",()=>{
    
    const newtable=approved.concat(decline);
      console.log(newtable);
      const myTable = generateTable(newtable);
      myTable.setAttribute("id","table");
      document.getElementById("result").appendChild(myTable);
        
  })


  //---------------------------read----------------------------------------
function ApprovereadData(path) {
    const reference = database.ref(path);
    reference.once('value').then((snapshot) => {
      console.log(Object.values(snapshot.val()));
      approved=Object.values(snapshot.val());
      
    })
      .catch((error) => {
         approved=[];
      });
  }

  function DeclinereadData(path) {
    const reference = database.ref(path);
    reference.once('value').then((snapshot) => {
      console.log(Object.values(snapshot.val()));
      decline=Object.values(snapshot.val());
      
    })
      .catch((error) => {
         decline=[];
      });
  }
  




  function generateTable(data) {
    
    // Create the table element
    const table = document.createElement('table');
  
    // Check if data is an array and has at least one element
    if (!Array.isArray(data) || data.length === 0) {
      return table;  // Empty table if no data
    }
  
    // Get the object properties (column names) from the first object
    const columns = Object.keys(data[0]);
  const row=["Status","course code","Date"]
    // // Create the table header row
    const headerRow = document.createElement('tr');
    row.forEach(column => {
      const headerCell = document.createElement('th');
      headerCell.textContent =column;
      headerRow.appendChild(headerCell);
    });
    table.appendChild(headerRow);
  
    // Create table body and rows for each object
    const tableBody = document.createElement('tbody');
    data.forEach(object => {
      const row = document.createElement('tr');
      columns.forEach(column => {
        const cell = document.createElement('td');
        const value = object[column];  // Access object property
        cell.textContent = value ? value : "";  // Handle undefined values
        row.appendChild(cell);
      });
      tableBody.appendChild(row);
    });
    table.appendChild(tableBody);
  
    return table;
  }
