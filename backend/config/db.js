const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "YOUR_PASSWORD",
    database: process.env.DB_NAME || "appointment_system",
    port: Number(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const connectDB = async () => {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log("MySQL Connected");
};

module.exports = { pool, connectDB };
