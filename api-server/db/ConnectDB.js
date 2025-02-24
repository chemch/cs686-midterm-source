//importing the mysql2/promise for using async await in conenction function and in querys
const mysql = require("mysql2/promise");

//the async await function which connects to the database using the credentials in the .env files
const ConnectDB = async () => {
  host = process.env.DB_HOST
  user = process.env.DB_USER
  password = process.env.DB_PASSWORD
  database = process.env.DB_DATABASE
  waitForConnections = process.env.DB_WAITFORCONNECTIONS
  connectionLimit = process.env.DB_CONNECTIONLIMIT
  queueLimit = process.env.DB_QUEUELIMIT
  tableName = process.env.DB_TABLE_NAME

  // print the database connection details
  console.log('Connecting to database with the following details:');
  console.log(`\tHost: ${host}`);
  console.log(`\tPassword: ${password.length > 0 ? '********' : ''}`);
  console.log(`\tUser: ${user}`);
  console.log(`\tDatabase: ${database}`);
  console.log(`\tWait for connections: ${waitForConnections}`);
  console.log(`\tConnection limit: ${connectionLimit}`);
  console.log(`\tQueue limit: ${queueLimit}`);
  console.log(`\tTable name: ${tableName}`);

  const pool = await mysql.createPool({
    host: host,
    user: user,
    password: password,
    database: database,
    waitForConnections: waitForConnections,
    connectionLimit: connectionLimit,
    queueLimit: queueLimit
  });

  // async await query which creates the database if it doesn't exist
  await pool.query(
    `CREATE DATABASE IF NOT EXISTS \`${database}\``
  );
  console.log(`Database ${database} created or already exists.`);

  // async await query which changes to the pool's database to the newly created database
  await pool.query(`USE \`${database}\``);
  console.log(`Switched to database ${database}`);

  // async await query which creates the 'users' table if it doesn't exist and creates table for id, name, email
  await pool.query(`CREATE TABLE IF NOT EXISTS \`${tableName}\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  console.log(`${tableName} table created or already exists.`);

  // returning pool to further add querys in the database we did till now
  return pool;
};

//exporting the function
module.exports = ConnectDB;
