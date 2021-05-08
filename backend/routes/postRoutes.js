const router = require("express").Router();
const postController = require("../controllers/postController");
const multer = require("multer");
const upload = multer();

// Post
router.get("/", postController.getAllPost);
router.get("/:id", postController.getOnePost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.modifyOnePost);
router.delete("/:id", postController.deleteOnePost);

// Like Post
router.patch("/like/:id", postController.likeOnePost);
router.patch("/unlike/:id", postController.unlikeOnePost);

// Comments Post
router.patch("/comments/:id", postController.createComment);
router.patch("/delete-comments/:id", postController.deleteOneComment);

module.exports = router;
