const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server-express");
const gravatar = require("../utils/gravatar");
require("dotenv").config();

module.exports = {
  newNote: async (parent, { content }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to create a note");
    }

    return await models.Note.create({
      content,
      author: mongoose.Types.ObjectId(user.id),
    });
  },
  deleteNote: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to delete a note");
    }

    const note = models.Note.findById(id);

    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError(`You don't have permissions to delete the note`);
    }

    try {
      await note.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  updateNote: async (parent, { id, content }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("You must be signed in to update a note");
    }

    const note = await models.Note.findById(id);

    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError(`You don't have permissions to update the note`);
    }

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
  toggleFavorite: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError("");
    }

    const noteCheck = await models.Note.findById(id);
    const hasUser = noteCheck.favoritedBy.includes(user.id);

    if (hasUser) {
      return await models.Note.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: -1,
          },
        },
        {
          new: true,
        }
      );
    } else {
      return await models.Note.findOneAndUpdate(
        {
          _id: id,
        },
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id),
          },
          $inc: {
            favoriteCount: 1,
          },
        },
        {
          new: true,
        }
      );
    }
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
      $or: [{ email: normalizedEmail }, { username }],
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
