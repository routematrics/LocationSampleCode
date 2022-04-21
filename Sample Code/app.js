const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const addUser = require('./app/v1/customer/registration/addUser');
var port = 7290  //Test Server
//const logger = require("./config/logger");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
 next();
});


//MongoConnect
require('./common/mongoDBConnector');

//Routes
app.use('/api/' + 'customer', require('./app/v1/customer/customer.js')(app));


app.listen(port, function () {
     console.log("app starting ")
})



