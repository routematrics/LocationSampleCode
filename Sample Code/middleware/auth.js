const business = require('./../app/v1/models/business')
const fs = require('fs');
const jwt = require('jsonwebtoken');

var publicKEY = fs.readFileSync('./domain.cert', 'utf8');

const auth = async (req, res, next) => {

    try {
        var apiKey = req.query.apiKey
        const token = req.header('Authorization').replace('Bearer ', '')

	    console.log(token)

        var verifyOptions = {
            algorithm: ["RS256"]
        };

        var decoded = jwt.verify(token, publicKEY, verifyOptions);
        console.log("\nJWT verification result: " + JSON.stringify(decoded));

        const businessData = await business.findOne({ apiKey: decoded.apiKey, token: token,  "accountStatus" : "Active" })
       console.log(businessData)
        if (!businessData) {
            throw new Error()
        }

        next()
    } catch (e) {
        res.status(401).send({ success: false, message: 'Unauthorized Access..' })
    }
}

module.exports = auth

