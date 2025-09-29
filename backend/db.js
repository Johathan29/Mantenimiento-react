import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'message',
});

db.connect((err) => {
  if (err) {
    console.log('❌ Error al conectar a MySQL:', err);
  } else {
    console.log('✅ Conectado a MySQL');
  }
});

export default db;
