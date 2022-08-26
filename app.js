const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./config/db');

const app = express();

const enquete = require('./routes/enquete');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(cors());

app.use('/enquete', enquete);

const port = process.env.PORT || 8080;

app.listen(port, ()=> console.log(`Servidor iniciado em localhost:${port}`));


