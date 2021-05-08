const router = require("express").Router();

// Controllers
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const uploadController = require("../controllers/uploadController");

// Multer
const multer = require("multer");
const upload = multer();

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

// Picture
router.post("/upload", upload.single("file"), uploadController.uploadProfil);

module.exports = router;
