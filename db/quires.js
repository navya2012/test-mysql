const connection = require('./connection'); // Import the connection

// Define queries as constants
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS todoList;`;

const createTasksTableQuery = `
  CREATE TABLE IF NOT EXISTS todoList.todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Function to initialize database schema
const initializeDatabase = () => {
    connection.query(createDatabaseQuery, (err) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database created ');
        // You might want to create tables here as well

        connection.query(createTasksTableQuery, (err) => {
            if (err) {
              console.error('Error creating tasks table:', err);
              return;
            }
            console.log('Tasks table created ');
          });
    });

    
};

// Export initialization function
module.exports = {
    initializeDatabase,
};
