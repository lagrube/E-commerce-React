const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signupErrors, signinErrors } = require("../utils/errors");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup = async (req, res) => {
  const { pseudo, email, password } = req.body;

  await userModel
    .create({ pseudo, email, password })
    .then(() => res.status(200).json("User created !"))
    .catch((err) => {
      const errors = signupErrors(err);
      res.status(400).json({ errors });
    });
};

// module.exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const maxAge = "24h";

//   await userModel.findOne({ email }).then((user) => {
//     if (!user) {
//       return res.status(400).json("User undefined !");
//     }
//     bcrypt
//       .compare(password, user.password)
//       .then((valid) => {
//         if (!valid) {
//           return res.status(400).json("Password undefined !");
//         }
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
//           expiresIn: "24h",
//         });
//         console.log("apres token");
//         res.cookie("jwt", token, { httpOnly: true, maxAge });
//         res.status(200).json({
//           userId: user._id,
//         });
//       })
//       .catch((err) => res.status(500).json({ err }));
//   });
// };

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = signinErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
