const customers = require('./../../models/customers')
const response = require('./../../../../common/success-error')

var login = async (req) => {

    var reqObj = req.body
    var query = {
        phone: reqObj.phone
    }

    try {

        var customerresp = await customers.findOne(query)
        var otp = Math.floor(100000 + Math.random() * 900000).toString()

        if (customerresp == null) {
            return response
                .failure("Phone number not registered!")
        } else {
            await customers.updateOne({ "customerId": customerresp.customerId }, { "otp": otp })
            return response
                .success("OTP sent to registered number!", null);
        }
    } catch (error) {
        return response
            .failure("Something went Wrong!")
    }

}


var verify = async (req) => {

    var reqObj = req.body
    var query = {
        phone: reqObj.phone
    }

    try {
        var customerresp = await customers.findOne(query)

        if (customerresp != null) {
            var otp = reqObj.otp
            if (otp == "" || otp == undefined || otp == null) {
                return response.failure("Invalid OTP")
            }

            if (parseInt(otp) == parseInt(customerresp.otp)) {
                var responseObj = {
                    customerId: customerresp.customerId,
                    phone: customerresp.phone,
                    email: customerresp.email,
                    firstName: customerresp.firstName,
                    lastName: customerresp.lastName
                }
                
                var resObj = {
                    success: true,
                    data: responseObj,
                    msg: "Valid OTP!",
                    isAuthorized: true
                }
                return resObj
            } else {
                return response.failure("Invalid OTP!")
            }
        } else {
            return response.failure("Invalid OTP")
        }
    } catch (e) {
        return response
            .failure("Something went wrong!");
    }

}

module.exports = { login, verify }



