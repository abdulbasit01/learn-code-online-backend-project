var router = require("express").Router();
const { getUserById, getUser, getAllUsers, deleteUser, updateUser, userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../guards/guards");


router.param("userId", getUserById)
router.get("/get-user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/update-user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/get-users", isSignedIn, getAllUsers);
router.get("/orders/user/:userId", isSignedIn, userPurchaseList);
router.delete("/delete-user/:id", isSignedIn, deleteUser);
module.exports = router;
