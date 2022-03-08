const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const gravatar = require("../utils/gravatar");
require("dotenv").config();

module.exports = {
  newNote: async (parent, { content }, { models }) => {
    return await models.Note.create({
      content,
      author: "Adam Scott",
    });
  },
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { id, content }, { models }) => {
    return await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      }
    );
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    const saltRounds = 10;
    const normalizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const avatar = gravatar(email);

    try {
      const user = await models.User.create({
        username,
        avatar,
        email: normalizedEmail,
        password: hashedPassword,
      });

      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error("Error creating account");
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    let normalizedEmail;

    if (email) {
      normalizedEmail = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      throw new AuthenticationError("Error signing in");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AuthenticationError("Error signing in");
    }

    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
