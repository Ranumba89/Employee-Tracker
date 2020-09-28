const {connection} = require("../utils");
const getRoles = () => {
  let roles = [];
  connection.query("SELECT * FROM roles", (err, rows) => {
    if (err) throw err;
     rows.forEach((r) => {
      roles.push(r);
    });
  });
  return roles;
};

module.exports={
    getRoles
}
