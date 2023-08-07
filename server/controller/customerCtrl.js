const asyncHandle = require("express-async-handler");
const Customer = require("../models/CustomerModel");
const addCustomer = asyncHandle(async (req, res) => {
  console.log(req.body);
  const cus = await Customer.find();
  const data = {
    customertype: req.body.loantype,
    customerid: `GRFinancial00${cus?.length + 1 || 1}`,
    persondetails: req.body.persondetails,
    ref1: req.body.reference.firstreferance,
    ref2: req.body.reference.secondreference,
    loantype: req.body.loandetails.loanType,
    loanAmount: req.body.loandetails.loanAmount,
    rateOfInterest: req.body.loandetails.rateOfInterest,
    tennuretime: req.body.loandetails.tennuretime,
    dateOfDisburment: req.body.loandetails.dateOfDisburment,
    providentfund: req.body.assetdetail.providentfund,
    cashinhand: req.body.assetdetail.cashinhand,
    cardetails: req.body.assetdetail.carDetails,
    propertydeatils: req.body.assetdetail.propertyDetails,
    documents: req.body.documents,
    firm: req.body?.firm,
    company: req.body?.company,
  };
  try {
    const newCustomer = await Customer.create(data);
    res.json("Customer is Added Sucessfully");
  } catch (error) {
    res.json(error.message);
  }
});

const getCustomerData = asyncHandle(async (req, res) => {
  const cus = await Customer.find();
  res.json(cus);
});

const deleteCustomerData = asyncHandle(async (req, res) => {
  const cus = await Customer.find();
  console.log(req.statusMessage)
  if (req.body._id) {
    const {_id} = req.body
    try {
      await Customer.findByIdAndDelete({_id})
      res.json("Selected customer is deleted sucessfully");
    } catch (error) {      
      res.json(error.message);
    }
  } else {
    res.json("Invalid Data");
  }
});

module.exports = { addCustomer, getCustomerData, deleteCustomerData };
