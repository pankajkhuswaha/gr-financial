const asyncHandle = require("express-async-handler");
const Customer = require("../models/CustomerModel");
const addCustomer = asyncHandle(async (req, res) => {
  const cus = await Customer.find();
  const data = {
    customertype: req.body.loantype,
    customerid: `GRFinancial00${cus?.length + 2 || 1}`,
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
    console.log(newCustomer)
    res.json("Customer is Added Sucessfully");
  } catch (error) {
    res.json(error.message);
  }
});

const updateCustomer = asyncHandle(async (req, res) => {
  try {
    const data = {
      customertype: req.body.customertype,
      customerid: req.body.customerid,
      persondetails: req.body.persondetails,
      ref1: req.body.ref1,
      ref2: req.body.ref2,
      loantype: req.body.loantype,
      loanAmount: req.body.loanAmount,
      rateOfInterest: req.body.rateOfInterest,
      tennuretime: req.body.tennuretime,
      dateOfDisburment: req.body.dateOfDisburment,
      providentfund: req.body.providentfund,
      cashinhand: req.body.cashinhand,
      cardetails: req.body.carDetails,
      propertydeatils: req.body.propertyDetails,
      documents: req.body.documents,
      firm: req.body.firm,
      company: req.body.company,
    };

    const updatedCustomer = await Customer.findByIdAndUpdate(req.body._id, data, { new: true });

    if (!updatedCustomer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json({ message: 'Customer details updated successfully', updatedCustomer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const getCustomerData = asyncHandle(async (req, res) => {
  const cus = await Customer.find();
  res.json(cus);
});

const deleteCustomerData = asyncHandle(async (req, res) => {
  if (req.params.id) {
    const _id = req.params.id
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

module.exports = { addCustomer, getCustomerData, deleteCustomerData,updateCustomer };
