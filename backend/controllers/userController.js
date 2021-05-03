const userModel = require("../models/userModels");

module.exports.getAllUsers = async (req, res) => {
  await userModel
    .find()
    .select("-password")
    .then((users) => res.status(200).json({ users }))
    .catch((err) => res.status(500).send({ err }));
};

module.exports.getOneUser = async (req, res) => {
  await userModel
    .findById(req.params.id)
    .select("-password")
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(401).send("ID unknow :" + err));
};

module.exports.modifyOneUser = async (req, res) => {
  const { picture, bio } = req.body;
  await userModel
    .findByIdAndUpdate(
      req.params.id,
      { bio },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    .then((userModified) => res.status(200).json({ userModified }))
    .catch((err) => res.status(400).send({ err }));
};

module.exports.deleteOneUser = async (req, res) => {
  await userModel
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(200).json("User deleted !"))
    .catch((err) => res.status(500).send({ err }));
};

module.exports.follow = async (req, res) => {
  await userModel
    .findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    )
    .then(() => res.status(200).json("Following added"))
    .catch((err) => res.status(500).json({ err }));

  await userModel
    .findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    )
    // .then(() => res.status(200).json("Followind add"))
    .catch((err) => res.status(500).json({ err }));
};

module.exports.unfollow = async (req, res) => {
  await userModel
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true, upsert: true }
    )
    .then(() => res.status(200).json("Following removed"))
    .catch((err) => res.status(500).json({ err }));

  await userModel
    .findByIdAndUpdate(
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    )
    // .then(() => res.status(200).json("Followind add"))
    .catch((err) => res.status(500).json({ err }));
};
