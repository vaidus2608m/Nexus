import mongoose, {Schema} from "mongoose";
import {SUPPORTED_GAMES, USER_STATUS, REGIONS} from "../utils/constants.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const gameProfileSchema = new Schema({
  gameName: {
    type: String,
    required: true,
    enum: SUPPORTED_GAMES,
  },
  rank: {
    type: String,
    default: "Unranked",
  },
  inGameId: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
    enum: REGIONS,
    default: "Global",
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is Required"],
      trim: true,
      minlength: [4, "Username must be at least 4 characters"],
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: 8,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: `https://api.dicebear.com/7.x/avataaars/svg?seed=default`,
    },
    nexusLevel: {
      type: Number,
      default: 1,
    },
    nexusXP: {
      type: Number,
      default: 0,
    },
    totalKills: {
      type: Number,
      default: 0,
    },
    totalDeaths: {
      type: Number,
      default: 0,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
    gameProfile: [gameProfileSchema],
    status: {
      type: String,
      enum: Object.values(USER_STATUS),
      default: "online",
    },
  },
  {timestamps: true},
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

export const User = mongoose.model("User", userSchema);
