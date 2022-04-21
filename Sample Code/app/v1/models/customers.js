var mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const fs = require('fs');

var Schema = mongoose.Schema;
const customerSchema = new Schema({

  customerId: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  otp: {
    type: String
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]

})

const customers = mongoose.model('customers', customerSchema)
module.exports = customers
