const express = require("express");
const {
  addCustomer,
  getCustomerData,
  deleteCustomerData,
  updateCustomer,
  getAllReminders,
  AssignCustomer,
} = require("../controller/customerCtrl");
const {
  authMiddleware,
  isAdmin,
  isSuper,
} = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/add", authMiddleware, isAdmin, addCustomer);
router.get("/", authMiddleware, isAdmin, getCustomerData);
router.get("/reminder", getAllReminders);
router.post("/assign", AssignCustomer);
router.delete("/:id", authMiddleware, isAdmin,isSuper, deleteCustomerData);
router.put("/", authMiddleware, isAdmin, updateCustomer);
module.exports = router;
