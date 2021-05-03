const userModel = require("../models/userModels");

module.exports.signup = async (req, res) => {
  const { pseudo, email, password } = req.body;

  await userModel
    .create({ pseudo, email, password })
    .then(() => res.status(200).json("User created !"))
    .catch((err) => res.status(400).send({ err }));
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
};
