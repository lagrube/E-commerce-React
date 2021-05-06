const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

// Auth
router.post("/register", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// User
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.modifyOneUser);
router.delete("/:id", userController.deleteOneUser);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

module.exports = router;
