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


/**
 * --------------------------
 * Retrieve credentials : JWT token 
 * --------------------------
 */
app.post('/api-0.1/login', (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    //checking to make sure the user entered the correct username/password combo
    if(username === USERNAME && password === PASSWORD) { 
        const user = {
            username: USERNAME,
            password: PASSWORD,
        };
        //if user log in success, generate a JWT token for the user with a secret key
        jwt.sign(user, PRIVATE_KEY_JWT, { expiresIn: '24h' },(err, token) => {
            if(err) { console.log(err) }    
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({jwt: token}, null, 3));
        });
    } else {
        console.log('ERROR: Could not log in');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({jwt: null}, null, 3));
        // res.sendStatus(403)
    }
})

/**
 * --------------------------
 * Check if JWT token is valid 
 * --------------------------
 */
const checkToken = function (req,res,next){
    const header = req.headers['authorization'];
    if(typeof header !== 'undefined')
    {
       const bearer = header.split(' ');
       const token = bearer[1];
       req.token=token;
       next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
  });