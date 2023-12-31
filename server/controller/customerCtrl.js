const asyncHandle = require("express-async-handler");
const Customer = require("../models/CustomerModel");
const User = require("../models/userModel");
const addCustomer = asyncHandle(async (req, res) => {
  const cus = await Customer.find();
  function generateUniqueCode() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();  
    const uniqueCode = `${hours}${minutes}${seconds}${milliseconds}`;  
    return uniqueCode.padStart(4, '0');
  }
  
  const uniqueCode = generateUniqueCode();
  console.log(uniqueCode);
  
  const data = {
    customertype: req.body.loantype,
    handleby:req.user.name,
    customerid: `GRF${uniqueCode}`,
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
      cardetails: req.body.cardetails,
      propertydeatils: req.body.propertydeatils,
      documents: req.body.documents,
      firm: req.body.firm,
      company: req.body.company,
    };

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.body._id,
      data,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer details updated successfully",
      updatedCustomer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getCustomerData = asyncHandle(async (req, res) => {
  const user = req.user;
  let data = [];
  const cus = await Customer.find();
  for (let i = 0; i < cus.length; i++) {
    if (cus[i].handleby === user.name) {
      data.push(cus[i]);
    }
  }
  if (user.super) {
    res.json(cus);
  } else {
    res.json(data);
  }
  // res.send(cus)
});

const AssignCustomer = asyncHandle(async (req, res) => {
  const { customerid, userid } = req.body;

  try {
    const use = await User.findOne({ _id: userid });

    if (!use) {
      return res.status(404).json("User not found");
    }

    const cus = await Customer.findOneAndUpdate(
      { _id: customerid },
      { $set: { handleby: use.name } },
      { new: true } // This option returns the updated document
    );

    if (!cus) {
      return res.status(404).json("Customer not found");
    }

    res.json("Assigned Successfully");
  } catch (error) {
    res.status(500).json("Assignment Failed");
  }
});

const deleteCustomerData = asyncHandle(async (req, res) => {
  if (req.params.id) {
    const _id = req.params.id;
    try {
      await Customer.findByIdAndDelete({ _id });
      res.json("Selected customer is deleted sucessfully");
    } catch (error) {
      res.json(error.message);
    }
  } else {
    res.json("Invalid Data");
  }
});
const getAllReminders = asyncHandle(async (req, res) => {
  const data = await Customer.find();
  let birtdayReminder = [];
  let disburseReminder = [];
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const todayYear = today.getFullYear();
  const fromatedTodayDate = JSON.stringify(
    new Date([todayMonth, todayDay + 1, todayYear].join("-"))
  )
    .split("T")[0]
    .split('"')[1];

  data.forEach((entry) => {
    entry.persondetails.forEach((person) => {
      const personDOBParts = person.dob.split("-");
      const personMonth = parseInt(personDOBParts[1]);
      const personDay = parseInt(personDOBParts[2]);

      if (personMonth === todayMonth && personDay === todayDay) {
        birtdayReminder.push({
          message: `Today is ${person.name}'s birthday!`,
          details: entry,
          type: "birthday",
        });
      }
    });
  });
  data.forEach(async (customer) => {
    const { _id, dateOfDisburment } = customer;

    const sixMonthsAfter = new Date(dateOfDisburment);
    sixMonthsAfter.setMonth(sixMonthsAfter.getMonth() + 6);
    const datetoCheckForDisbursement = JSON.stringify(sixMonthsAfter)
      .split("T")[0]
      .split('"')[1];
    if (datetoCheckForDisbursement === fromatedTodayDate) {
      disburseReminder.push({
        message: `${customer.customerid} completed six month of disbursement.`,
        type: "disburse",
        details: customer,
      });
    }
    if (customer.cardetails.length !== 0) {
      const carDetails = customer.cardetails;
      if (carDetails) {
        carDetails.forEach(async (car) => {
          const renewalMonth = car.policyRenewalMonth;
          const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          function getPreviousMonth(selectedMonth) {
            const selectedMonthIndex = month.indexOf(selectedMonth);
            const previousMonthIndex =
              selectedMonthIndex === 0 ? 11 : selectedMonthIndex - 1;
            return month[previousMonthIndex];
          }

          if (renewalMonth) {
            const previousMonth = getPreviousMonth(renewalMonth);
            const Month = month[todayMonth - 1];            
            if (previousMonth === Month) {
              const dataa ={
                message: `${customer.customerid}'s car policy renewal is in next month.`,
                details: customer,
                type: "disburse",
              }
              disburseReminder.push(dataa)
            }
          }
        });
      }
    }
  });

  const merge = birtdayReminder.concat(disburseReminder);
  res.json(merge);
});

module.exports = {
  addCustomer,
  getCustomerData,
  deleteCustomerData,
  updateCustomer,
  getAllReminders,
  AssignCustomer,
};
