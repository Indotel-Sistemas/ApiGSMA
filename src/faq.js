const sql = require('mssql');
var express = require('express');
const app = express();
const config = require('../dbconfig.js');

// GET las preguntas frecuentes---------------------------------------------
app.get("/FAQ", async function(req , res){
    let pool = await sql.connect(config)
    const result = await pool.request().query('select * from FAQ order by Orden');
    res.json(result.recordsets[0]);
});

// POST nueva pregunta frecuente---------------------------------------------
app.post("/FAQ/add", async function(req , res){
    sql.connect(config, (err )=> {
        var FAQ = {
            Pregunta: req.body.Pregunta,
            Respuesta: req.body.Respuesta,
            Status: req.body.Status,
            Orden: req.body.Orden
        }

        let request = new sql.Request();
        let cols = [];
        let inputs = [];
        for (let k in FAQ) {
            request.input(k, FAQ[k]);
            cols.push(k);
            inputs.push('@' + k);
        }

        let query = `Insert into FAQ (${cols.toString()}) OUTPUT Inserted.Id values (${inputs.toString()})`;
        request.query(query, (err, resolve) => {
            err ? console.log(err) : res.send(resolve['recordset'][0]);
        });

    }); 
});

// PUT editar pregunta frecuente---------------------------------------------
app.post("/FAQ/edit", async function(req , res){
    sql.connect(config, (err )=> {

        const Id = req.body.Id;

        var FAQ = {
            Pregunta: req.body.Pregunta,
            Respuesta: req.body.Respuesta,
            Status: req.body.Status
        }


        let request = new sql.Request();
        let cambios = '';
        let contador = 0;
        for (let k in FAQ) {
            contador == 0 
            ?
            cambios += `${k} = '${FAQ[k]}',`
            :
                contador == 1 
                ?
                cambios += ` ${k} = '${FAQ[k]}'`
                :
                cambios += `, ${k} = '${FAQ[k]}'`
            ++contador
        }

        let query = `update FAQ set ${cambios} OUTPUT Inserted.Id where Id = ${Id}`;
        request.query(query, (err, resolve) => {
            err ? console.log(err) : res.send(resolve['recordset'][0]);
        });

    }); 
});


// DELETE editar pregunta frecuente---------------------------------------------
app.post("/FAQ/delete", async function(req , res){
    sql.connect(config, (err )=> {

        const Id = req.body.Id;
        let request = new sql.Request();

        let query = `Delete from FAQ where Id = ${Id}`;
        request.query(query, (err, resolve) => {
            err ? console.log(err) : res.send(JSON.stringify(resolve['rowsAffected'][0]));
        });

    }); 
});

app.post("/FAQ/editOrder", async function(req , res){
    sql.connect(config, (err )=> {
        
        const faqs = req.body;
        
        let cambios = '';
        cambios = faqs.map( (faq, i) => {
            return cambios + `WHEN ${faq.Id} THEN ${i+1} ` 
        })

        const concatenacion = (acumulador, valorActual) => acumulador + valorActual;
        cambios.reduce(concatenacion);

    
            
        let request = new sql.Request();
        let query = `UPDATE FAQ SET Orden = CASE Id ${cambios}END`;
        query = query.replace(/,/g, '')

        request.query(query, (err, resolve) => {
            err ? console.log(err) : res.send(resolve);
        });
    }); 
});




module.exports = app;