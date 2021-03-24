const sql = require('mssql');

const config = {
    user: 'av',
    password: 'admin123',
    server: 'NB-5P-DTIC-24\\SQLEXPRESS',
    database: 'GSMA',
    options:{
        trustedconnection: true,
        enableArithAbort: true,
        instancename : 'SQLEXPRESS'
    },
}

module.exports = config;