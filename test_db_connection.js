const mysql = require('mysql2/promise');

async function testConnection() {
  const connection = await mysql.createConnection({
    host: 'svc-291ecb7f-d2d2-4243-ac62-8219b36fada0-dml.aws-oregon-3.svc.singlestore.com',
    port: 3306,
    user: 'admin',
    password: 'SingleStore2024',
    database: 'mkstartupupvote'
  });

  try {
    const [rows] = await connection.execute('SELECT 1');
    console.log('Connection successful!');
    console.log('Query result:', rows);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await connection.end();
  }
}

testConnection();