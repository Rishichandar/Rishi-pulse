const mysql = require("mysql2");

const Connection = mysql.createConnection({
  // host: "192.168.0.148",
  host: "localhost",
  user: "root",
  password: "rishi@123",
  database: "pulse", // Corrected the database name here
  // database: "pulsedb", // Corrected the database name here
});

Connection.connect((err) => {
  if (err) console.log(err.stack);
  console.log("Successfully connected to the database.");
});

module.exports = Connection; // Export using module.exports for CommonJS
