const express = require("express");
const {
  addCustomer,
  getCustomerData,
  deleteCustomerData,
  updateCustomer,
} = require("../controller/customerCtrl");
const {
  authMiddleware,
  isAdmin,
  isSuper,
} = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/add", authMiddleware, isAdmin, addCustomer);
router.get("/", authMiddleware, isAdmin, getCustomerData);
router.delete("/:id", authMiddleware, isAdmin,isSuper, deleteCustomerData);
router.put("/", authMiddleware, isAdmin,isSuper, updateCustomer);
module.exports = router;
