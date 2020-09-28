const {connection} = require("../utils");

const getDepartments=()=>{
  const departments=[];
  connection.query("SELECT * FROM department",(err,rows)=>{
    if (err)throw err;
    rows.forEach(d => {
      departments.push(d)
    });
  });
  return departments;
}

module.exports={
    getDepartments
}