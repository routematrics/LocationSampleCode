var customers = require('../../models/customers');
var response = require('../../../../common/success-error');
var _ = require('lodash');
var moment = require('moment')

var addUser= async (req) => {

    try {
        var reqObj = req.body
        var registrationObj = new customers();
        registrationObj['email'] = reqObj.email
        registrationObj['phone'] = reqObj.phone
        registrationObj['customerId'] = reqObj.customerId
        registrationObj['firstName'] = reqObj.firstName
        registrationObj['lastName'] = reqObj.lastName
       /*
        for (var key in reqObj) {
            if (reqObj.hasOwnProperty(key)) {
                var val = reqObj[key];
                registrationObj[key] = val;
            }
        }
        */
        
        var resObj1 = await registrationObj.save();

        return response
            .success("Add User Success!", resObj1);

    } catch (error) {
        console.log(error)
        return response
            .failure("Add User Failed!");
    }
}

module.exports = addUser