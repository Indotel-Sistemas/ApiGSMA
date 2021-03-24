const sql = require('mssql');
var express = require('express');
const app = express();
const config = require('../dbconfig.js');

// GET las preguntas frecuenteas---------------------------------------------
app.get("/FAQ", async function(req , res){
    let pool = await sql.connect(config)
    const result = await pool.request().query('select * from FAQ');
    res.json(result.recordsets[0]);
});



module.exports = app;