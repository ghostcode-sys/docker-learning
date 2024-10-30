const pg = require("pg")

let pool = undefined
const CreateConnection = async() => {
    pool = new pg.Pool({
        host: 'postgres_DB',
        user: 'postgres',
        password: 'password',
        database: 'postgres',
        port: 5432,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    })

    try{
        const client = await pool.connect(); // Get a connection from the pool
        console.log("Connected to the PostgreSQL database");
    
        // Perform a test query
        const res = await client.query('SELECT 1');
        console.log("Established");
    
        client.release(); // Release the client back to the pool
      } catch (err) {
        console.error("Connection error:", err.stack);
      }
}

const  CloseConnection = async() => {
    await pool.end()
}

const query = (text, params) => pool.query(text, params)

module.exports = {CreateConnection, CloseConnection, query}