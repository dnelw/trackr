const crypto = require("crypto");

const generateSalt = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

const hashPassword = (password, salt) => {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  const hashedPassword = hash.digest("hex");
  return {
    salt,
    hashedPassword,
  };
};

module.exports = {
  generateSalt,
  hashPassword,
};
