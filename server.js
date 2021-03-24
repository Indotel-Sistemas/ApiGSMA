const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const FAQ = require('./src/faq');



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 5000;
app.listen(port);
console.log('API runnning at port ' + port);


app.use(FAQ);
