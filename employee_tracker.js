const {connection,notBlank} = require("./utils");
const inquirer = require("inquirer");
const { getDepartments } = require("./queries/departments.");
const { getRoles } = require("./queries/roles");
const { getEmployees } = require("./queries/employees");


let employees,roles,departments;

const employeePromps=()=>[
  {
    name: "firstName",
    message: "Employee's first name: ",
    validate:notBlank
  },
  {
    name: "lastName",
    message: "Employee's last name: ",
    validate:notBlank
  },
  {
    name: "role",
    message: "Employee's role: ",
    type:"list",
    choices:roles.map(r=>r.title)
  },
  {
    name: "manager",
    message: "Employee's manager: ",
    type:"list",
    choices:employees.map(e=>`${e.first_name} ${e.last_name}`)
  },
];
const departmentPromps=()=>[
  {
    name: "departmentName",
    message: "What do you want to call the department: ",
    validate:notBlank
  }
 
];
const rolesPromps=()=>[
  {
    name: "roleTitle",
    message: "What is the title of the role you want to add: ",
    validate:notBlank
  },
  {
    name: "roleSalary",
    message: "What is the salary you want to add: ",
    validate:notBlank
  },
  {
    name: "dept",
    message: "choose a department for this role:  ",
    type:"list",
    choices:departments.map(d=>d.DNAME)
  }
 
];



function employeeView() {
  
  const employeeSql = `Select e.id, e.first_name, e.last_name, r.title,d.dname, r.salary,
  m.first_name as mgr_first_name, m.last_name as mgr_last_name from employees as e 
  INNER JOIN roles as r ON r.id = e.role_id
  inner join department as d on d.id = r.department_id
  inner join employees as m on m.id = e.manager_id;
  `;
    connection.query(employeeSql, function (err, res) {
      if (err) throw err;
    console.log("Id".padEnd(3) + " | " + "First Name".padEnd(12) + " | " + "Last Name".padEnd(10)
      + " | " + "Title".padEnd(18) + " | " + "Department".padEnd(12) + " | "
      + "Salary".padEnd(8) + " | " + "Manager".padEnd(16));
  
    console.log("-".padEnd(3, "-") + " | " + "-".padEnd(12, "-") + " | " + "-".padEnd(10, "-")
      + " | " + "-".padEnd(18, "-") + " | " + "-".padEnd(12, "-") + " | "
      + "-".padEnd(8, "-") + " | " + "-".padEnd(16, "-"));
  
    for (var i = 0; i < res.length; i++) {
      const aRes = res[i];
      console.log((aRes.id + "").padEnd(3) + " | " + aRes.first_name.padEnd(12) + " | " + aRes.last_name.padEnd(10)
        + " | " + aRes.title.padEnd(18) + " | " + aRes.dname.padEnd(12) + " | "
        + (aRes.salary + "").padEnd(8) + " | " + aRes.mgr_first_name.padEnd(10) + aRes.mgr_last_name.padEnd(6));
    }
    console.log();
    chooseAction();
  });
  
}
function viewDepartments() {
  console.log("ID".padEnd(5)+ "|" + "Department".padEnd(15));
  console.log("-".padEnd(5,"-")+ "|" + "-".padEnd(15,"-"));

  for (var i = 0; i < departments.length; i++) {
    const dept = departments[i];
    // Log all results of the SELECT statement
    console.log((dept.id+"").padEnd(5) + "|" +dept.DNAME.padEnd(15));
    // connection.end();
    
  };
  chooseAction();

}
function viewRoles() {
  console.log("Id".padEnd(5)+ " | " + "Title".padEnd(20)+ "|" + "Salary".padEnd(15));
  console.log("-".padEnd(5,"-")+ " | " + "-".padEnd(20,"-")+ "|" + "-".padEnd(15,"-"));

  for (var i = 0; i < roles.length; i++) {
    const ro = roles[i];
    // Log all results of the SELECT statement
    console.log((ro.id+"").padEnd(5) + " | " + (ro.title+"").padEnd(20) + "|" +(ro.salary+"").padEnd(15));
    // connection.end();
    
  };
  chooseAction();

}

 function chooseAction() {

   inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: ["Exit","View employees","View departments","View roles","Add employees","Add department", "Add roles","Update employee", "Delete employee"],
  }).then((ans)=>{
 
  switch (ans.action) {
    case "View employees":
      employeeView();
      break;
    case "View departments":
      viewDepartments();
      break;
    case "View roles":
      viewRoles();
      break;
    case "Add employees":
      addEmployee();
      break; 
    case "Add department":
      addDepartment();
      break;
    case "Add roles":
      addRoles();
      break;
    case "Update employee":
      updateEmployee();
      break;
    case "Delete employee":
      deleteEmployee();
      break;
    case "Exit":
      connection.end();
      break;
  }
})

}

function deleteEmployee() {
  console.log("Delete Employee");
  console.log("---------------");
   inquirer.prompt([
      {
        name: "name",
        message: "Which employee do you wish to delete: ",
        type:"list",
        choices:employees.map(e=>`${e.first_name} ${e.last_name}`)
      },
     
    ]).then((ans)=>{
      // Delete Employee
      const eeObj = employees.find((e) => {
        return ans.name === `${e.first_name} ${e.last_name}`;
      });

    
      connection.query(`DELETE FROM employees WHERE id = ?`,[eeObj.id],(err,data)=>{
        if(err){
          console.log("Cannot delete ",ans.name);
        }
        else{
          console.log("Deleted",ans.name);
          employees = getEmployees();
        }
      chooseAction();
      });
            
    });

}

function updateEmployee() {
  console.log("Update Employee");
  console.log("---------------");
  inquirer.prompt([
    {
      name: "name",
      message: "Which employee do you wish to update: ",
      type:"list",
      choices:employees.map(e=>`${e.first_name} ${e.last_name}`)
    },
    {
      name: "role",
      message: "Role to Update: ",
      type:"list",
      choices:roles.map(r=>r.title)
    },

   
  ]).then((ans)=>{
    const roleObj = roles.find((r) => {
      return ans.role === r.title;
    });
    const eeObj = employees.find((e) => {
      return ans.name === `${e.first_name} ${e.last_name}`;
    });
// console.log(roleObj,eeObj);
    // update Employee role
    connection.query(
      "UPDATE employees SET role_id = ? WHERE id = ?", [roleObj.id, eeObj.id],  (err, data) => {
        if (err) throw err;
        console.log(ans.name, "is updated");
        chooseAction();
      }
    );
  });
}

function addEmployee() {
  console.log("Adding Employee");
  console.log("---------------");
  inquirer.prompt(employeePromps()).then((ans) => {
    const roleObj = roles.find((r) => {
      return ans.role === r.title;
    });
    const eeObj = employees.find((e) => {
      return ans.manager === `${e.first_name} ${e.last_name}`;
    });

    // insert employee into the database
    connection.query(
      `INSERT INTO  employees (first_name, last_name, role_id,manager_id ) VALUES(?,?,?,?) `,
      [ans.firstName, ans.lastName, roleObj.id, eeObj.id],  (err, data) => {
        if (err) {
          throw err;
        }
        employees = getEmployees();
      }
    );

    chooseAction();
  });
}
function addDepartment() {
  console.log("Adding Department");
  console.log("---------------");
  inquirer.prompt(departmentPromps()).then((ans) => {
    

    // insert department into the database
    connection.query(
      `INSERT INTO  department (dname) VALUES(?) `,
      [ans.departmentName],  (err, data) => {
        if (err) {
          throw err;
        }
        departments = getDepartments();
        chooseAction();
      }
    );

    
  });
}
function addRoles() {
  console.log("Adding Roles");
  console.log("---------------");
  inquirer.prompt(rolesPromps()).then((ans) => {
    const depObj = departments.find((d) => {
      return ans.dept === d.DNAME;
    });
    // const roleSal = roles.find((r) => {
    //   return ans.roleSalary === `${r.salary}`;
    // });

    // insert employee into the database
    connection.query(
      `INSERT INTO  roles (title, salary, department_id ) VALUES(?,?,?) `,
      [ans.roleTitle, ans.roleSalary, depObj.id],  (err, data) => {
        if (err) {
          throw err;
        }
        roles = getRoles();
      }
    );

    chooseAction();
  });
}

connection.connect(function (err) {
  if (err) throw err;
  departments = getDepartments();
  roles = getRoles();
  employees = getEmployees();
  chooseAction();
});

  
  
