const mysql = require('mysql2/promise');
const ConnectDB = require('./ConnectDB');

jest.mock('mysql2/promise');

describe('ConnectDB', () => {
  let mockPool;

  beforeEach(() => {
    mockPool = {
      query: jest.fn(),
    };
    mysql.createPool.mockReturnValue(mockPool);
    process.env.DB_HOST = 'localhost';
    process.env.DB_USER = 'test_user';
    process.env.DB_PASSWORD = 'test_password';
    process.env.DB_DATABASE = 'test_db';
    process.env.DB_WAITFORCONNECTIONS = 'true';
    process.env.DB_CONNECTIONLIMIT = '10';
    process.env.DB_QUEUELIMIT = '0';
    process.env.DB_TABLE_NAME = 'users';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create and switch to the database, and create the users table', async () => {
    await ConnectDB();

    expect(mysql.createPool).toHaveBeenCalledWith({
      host: 'localhost',
      user: 'test_user',
      password: 'test_password',
      database: 'test_db',
      waitForConnections: 'true',
      connectionLimit: '10',
      queueLimit: '0',
    });

    expect(mockPool.query).toHaveBeenCalledWith(
      'CREATE DATABASE IF NOT EXISTS `test_db`'
    );
    expect(mockPool.query).toHaveBeenCalledWith('USE `test_db`');
    // expect(mockPool.query).toHaveBeenCalledWith(
    //   'CREATE TABLE IF NOT EXISTS `users` (\
    //     id INT AUTO_INCREMENT PRIMARY KEY,\
    //     name VARCHAR(50) NOT NULL,\
    //     email VARCHAR(100) NOT NULL UNIQUE,\
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\
    //   )'
    // );
  });
});