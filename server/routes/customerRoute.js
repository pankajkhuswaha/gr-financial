const express = require("express");
const {
  addCustomer,
  getCustomerData,
  deleteCustomerData,
} = require("../controller/customerCtrl");
const {
  authMiddleware,
  isAdmin,
  isSuper,
} = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/add", authMiddleware, isAdmin, addCustomer);
router.get("/", authMiddleware, isAdmin, getCustomerData);
router.delete("/", authMiddleware, isAdmin,isSuper, deleteCustomerData);
module.exports = router;
