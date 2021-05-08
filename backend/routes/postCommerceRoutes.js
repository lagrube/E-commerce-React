const router = require("express").Router();
const postCommerceController = require("../controllers/postCommerceController");
const multer = require("multer");
const upload = multer();

// Post
router.get("/", postCommerceController.getAllPost);
router.get("/:id", postCommerceController.getOnePost);
router.post("/", upload.single("file"), postCommerceController.createPost);
router.put("/:id", postCommerceController.modifyOnePost);
router.delete("/:id", postCommerceController.deleteOnePost);

// Like Post
router.patch("/like/:id", postCommerceController.likeOnePost);
router.patch("/unlike/:id", postCommerceController.unlikeOnePost);

// Comments Post
router.patch("/comments/:id", postCommerceController.createComment);
router.patch("/delete-comments/:id", postCommerceController.deleteOneComment);

module.exports = router;
