const crypto = require("crypto");

exports.getHex = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}