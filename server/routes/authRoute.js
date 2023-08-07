const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgetPasswordToken,
  resetPassword,
  loginAdmin,
  updateRole,
  isAdminuser
 
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin, isSuper } = require("../middlewares/authMiddleware");


const router = express.Router();
router.post("/register", createUser);
router.post("/isadmin", isAdminuser);
router.post("/forgot-password-token", forgetPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/all-users", authMiddleware,isAdmin,getallUser);
router.get("/refresh", handleRefreshToken);
router.post("/logout", logout);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put(
  "/order/update-order/:id",
  authMiddleware,
);


router.put("/edit-user", authMiddleware,updatedUser);
router.put("/edit-role/:id", authMiddleware,isAdmin,isSuper,updateRole);
router.put("/block-user/:id",authMiddleware,isAdmin,isSuper, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, isSuper,unblockUser);


module.exports = router;
