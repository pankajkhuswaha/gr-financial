const mongoose = require("mongoose");
const CustomerModel = new mongoose.Schema(
  {
    handleby: {
      type: String,
      require: true,
      default: "admin",
    },
    customertype: {
      type: String,
      require: true,
    },
    customerid: {
      type: String,
      require: true,
      unique: true,
    },
    persondetails: {
      type: Array,
    },
    ref1: {
      type: String,
    },
    ref2: {
      type: String,
    },
    loantype: {
      type: Array,
    },
    loanAmount: {
      type: String,
    },
    rateOfInterest: {
      type: String,
    },
    tennuretime: {
      type: String,
    },
    dateOfDisburment: {
      type: String,
    },
    providentfund: {
      type: String,
    },
    documents: {
      type: Array,
    },
    cashinhand: {
      type: String,
    },
    cardetails: {
      type: Array,
    },
    propertydeatils: {
      type: Array,
    },
    firm: {
      type: Array,
    },
    company: {
      type: Array,
    },
    date: {
      type: Date,
      default: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("customer", CustomerModel);
