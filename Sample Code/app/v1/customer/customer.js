var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')

var actions = require('../../../common/actions').customers

router.use(bodyParser.json());
router.use(express.static('public'));
router.use(bodyParser.urlencoded({ extended: false }));

var customer=() => {

    router.post('/login', async (req, res) => {
        try {
       
            var response = await actions.login.login(req);
            res.send(response);
        } catch (error) {
            res.status(401).send(error);
        }
    });

    router.post('/verify', async (req, res) => {
        try {
            var response = await actions.login.verify(req);
      
            res.status(201).send(response);
        } catch (error) {
            res.status(401).send(error);
        }
    });

    router.post('/add_user', async (req, res) => {
        try {
            var response = await actions.addUser(req);
      
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send(error);
        }
    });
   
    router.post('/add_user/delete', async (req, res) => {
        try {
            var response = await actions.addUser.delete(req);
      
            res.status(200).send(response);
        } catch (error) {
            res.status(400).send(error);
        }
    });
    return router;
}
 
module.exports = customer
