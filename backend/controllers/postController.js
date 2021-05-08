const postModel = require("../models/postModel");
const userModel = require("../models/userModels");
const { uploadErrors } = require("../utils/errors");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

// POST
module.exports.getAllPost = (req, res) => {
  postModel
    .find()
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ err }))
    .sort({ createdAt: -1 });
};

module.exports.getOnePost = (req, res) => {
  postModel
    .findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
};

module.exports.createPost = async (req, res) => {
  const { posterId, message, vidéo } = req.body;

  let fileName;

  if (req.file) {
    try {
      if (
        req.file.detectedMimeType != "image/jpg" &&
        req.file.detectedMimeType != "image/jpeg" &&
        req.file.detectedMimeType != "image/png"
      )
        throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(401).json({ errors });
    }

    fileName = req.body.posterId + Date.now() + ".jpg";

    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../../frontend/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = new postModel({
    posterId,
    message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    vidéo,
    likers: [],
    comments: [],
  });

  newPost
    .save()
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
};

module.exports.modifyOnePost = (req, res) => {
  const { message } = req.body;

  postModel
    .findByIdAndUpdate(
      req.params.id,
      { message },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ err }));
};

module.exports.deleteOnePost = (req, res) => {
  postModel
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json("Post deleted !"))
    .catch((err) => res.status(500).json(err));
};

module.exports.likeOnePost = (req, res) => {
  postModel
    .findByIdAndUpdate(
      req.params.id, // Post Id
      {
        $addToSet: { likers: req.body.id }, // User Id
      },
      { new: true }
    )
    .catch((err) => res.status(500).json({ err }));

  userModel
    .findByIdAndUpdate(
      req.body.id, // User Id
      {
        $addToSet: { likes: req.params.id }, // Post Id
      },
      { new: true }
    )
    .then((like) => res.status(200).json(like))
    .catch((err) => res.status(200).json({ err }));
};

module.exports.unlikeOnePost = (req, res) => {
  postModel
    .findByIdAndUpdate(
      req.params.id, // Post Id
      {
        $pull: { likers: req.body.id }, // User Id
      },
      { new: true }
    )
    .catch((err) => res.status(500).json({ err }));

  userModel
    .findByIdAndUpdate(
      req.body.id, // User Id
      {
        $pull: { likes: req.params.id }, // Post Id
      },
      { new: true }
    )
    .then((unlike) => res.status(200).json(unlike))
    .catch((err) => res.status(200).json({ err }));
};

// COMMENTS

module.exports.createComment = (req, res) => {
  postModel
    .findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    )
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json(err));
};

module.exports.deleteOneComment = (req, res) => {
  postModel
    .findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
    .then(() => res.status(200).json("Comment deleted !"))
    .catch((err) => res.status(500).json({ err }));
};
