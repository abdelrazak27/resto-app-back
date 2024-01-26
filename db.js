const { Pool } = require('pg');

const connectionString = process.env.SUPABASE_CONNECTION_STRING;

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = pool;
