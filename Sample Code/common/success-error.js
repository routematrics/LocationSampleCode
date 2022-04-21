var success = (msg, data) => {
    var success = {
        "success": true,
            "data": data,
            "message": msg,
	    "isAuthorized": true
        
    }
    return success;
}

var failure = (msg) => {
    var error = {
        "success": false,
        "message": msg,
	 "isAuthorized": true
    }
    return error;
}

module.exports = {success, failure};
