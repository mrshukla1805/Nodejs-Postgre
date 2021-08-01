const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'firstapi'
});

const allUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(response.rows);
};

const getById = async (req,res) => {
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    res.status(500).json(response.rows);
}

const newUser = async (req,res) => {
    const {name, email} = req.body;
    
    const response = await pool.query('INSERT INTO users(name, email) VALUES ($1, $2)', [name, email]);
    console.log(response);
    res.json({
        message: 'User added',
        body: {
            user: {name, email}
        }
    })
};

const update = async (req,res) => {
    const {name, email} = req.body;
    
    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        req.params.id
    ]);
    console.log(response);
    res.json('User updated');
};

const removeUser = async (req,res) => {
    const response = await pool.query('DELETE FROM users WHERE id= $1', [req.params.id]);
    console.log(response);
    res.json(`User ${req.params.id} deleted`);
};

module.exports = {
    allUsers, 
    getById,
    newUser,
    update,
    removeUser 
}
