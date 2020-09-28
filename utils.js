var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Gcakatmac20",
    database: "employee_tracker"
  });
  
  const notBlank=(input)=>{
    input=input.trim();
    if (!input){
      return "Incorect input"
    }
    return true;
  }

  module.exports={
    notBlank,
    connection
  };