import {User} from "../models/user.model.js";
import {APIError} from "../utils/api-error.js";
import {APIResponse} from "../utils/api-response.js";
import {asyncHandler} from "../utils/async-handler.js";

const registerUser = asyncHandler(async (req, res) => {
  const {username, password, email, fullName} = req.body;

  if (
    [username, password, email, fullName].some((field) => field.trim() === "")
  ) {
    throw new APIError(400, "All fields are required", []);
  }

  const userExist = await User.findOne({
    $or: [{username}, {email}],
  });

  if (userExist) {
    throw new APIError(409, "User with email/username already exists", []);
  }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new APIError(
      500,
      "User can't be created due to some internal server error",
      [],
    );
  }

  return res
    .status(201)
    .json(
      new APIResponse(201, {user: createdUser}, "User Registered Successfully"),
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const {email, username, password} = req.body;

  if (!email && !username) {
    throw new APIError(400, "Email/Username is required");
  }

  const user = await User.findOne({$or: [{email}, {username}]});
  if (!user) {
    throw new APIError(400, "User doesn't exists");
  }

  const isPasswordVaild = await user.isPasswordCorrect(password);
  if (!isPasswordVaild) {
    throw new APIError(401, "Invalid Credentials");
  }

  const accessToken = user.generateAccessToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new APIResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User Logged In Successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new APIResponse(200, {}, "User Logged Out Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new APIResponse(200, req.user, "Current User"));
});

export {registerUser, loginUser, logoutUser, getCurrentUser};
