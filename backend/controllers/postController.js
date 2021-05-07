const postModel = require("../models/postModel");
const userModel = require("../models/userModels");

// POST
module.exports.getAllPost = (req, res) => {
  postModel
    .find()
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json({ err }));
};

module.exports.getOnePost = (req, res) => {
  postModel
    .findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(500).json(err));
};

module.exports.createPost = (req, res) => {
  const { posterId, message, vidéo } = req.body;

  const newPost = new postModel({
    posterId,
    message,
    vidéo,
    likers: [],
    comments: [],
  });

  newPost
    .save()
    .then((post) => res.status(200).json("Post created !", post))
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
    .then((post) => res.status(200).json("Post modified !", post))
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

module.exports.createComment = (req, res) => {};

module.exports.modifyOneComment = (req, res) => {};

module.exports.deleteOneComment = (req, res) => {};
