const {connection} = require("../utils");

const getEmployees=()=>{
    const employees=[];
    connection.query("SELECT * FROM employees",(err,rows)=>{
      if (err)throw err;
      rows.forEach(e => {
        employees.push(e)
      });
    });
    return employees;
  }

  module.exports={
    getEmployees,
}