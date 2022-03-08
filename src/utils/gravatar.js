const md5 = require("md5");

const getGravatar = (email) => {
  return `https://www.gravatar.com/avatar/${md5(email)}.jpg?d=identicon`;
};

module.exports = getGravatar;
