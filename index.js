const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');


const app = express();
const DATABASE_URL = 'http://ec2-15-188-80-113.eu-west-3.compute.amazonaws.com:5984/virtuace';

// BDD login
const USERNAME = process.env.username;
const PASSWORD = process.env.password;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
});



app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
  });