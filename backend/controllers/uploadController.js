const userModel = require("../models/userModels");
const fs = require("fs");
const { promisify } = require("util");
const { uploadErrors } = require("../utils/errors");
const pipeline = promisify(require("stream").pipeline);

module.exports.uploadProfil = async (req, res) => {
  console.log(req.file);

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

  const fileName = req.body.name + ".jpg";

  await pipeline(
    req.file.stream,
    fs.createWriteStream(
      `${__dirname}/../../frontend/public/uploads/profil/${fileName}`,
    ),
  );

  await userModel
    .findByIdAndUpdate(
      req.body.userId,
      { picture: "./uploads/profil/" + fileName },
      { new: true, upsert: true },
    )
    .select("-password")
    .then((upload) => res.status(200).json(upload))
    .catch((err) => res.status(500).json({ err }));
};
