import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const signup = async (req, res) => {
  /*
    1. get the email and pwd
    2. validate them via joi
    3. hash them
    4. store them
    5. return 201
    */
  const { email, password } = req.body;
  const doesUserExist = await User.findOne({ email });

  if (doesUserExist) {
    return res.status(409).json({
      message: "❌ User already exists, please use your password and sign in.",
    });
  }

  const hashedPassword = await hash(password, 10);

  try {
    await User.create({ email, password: hashedPassword });
    return res.status(201).json({
      message: "✅ User successfully created.",
    });
  } catch (err) {
    return res.status(500).json({
      message:
        "❌ Something went wrong while attempting to create the given user, please try again.",
      error: err,
    });
  }
};
const signin = async (req, res) => {
  /*
    1. get the email and pwd
    2. validate them via joi
    3. check correctness with bcrypt.compare
    4. generate jwt
    5. set cookie
    6. send 200
    */

  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(404).json({
        message: "❌ User doesn't exist, please create a new account.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        "❌ Something went wrong while attempting to fetch the given user details, please try again.",
      error,
    });
  }

  const isValid = await compare(password, existingUser.password);

  if (!isValid) {
    return res.status(401).json({
      message: "❌ Incorrect credentials.",
    });
  }
  const objectToSign = { email, _id: existingUser._id };
  const token = jwt.sign(objectToSign, process.env.TOKEN_SECRET, {
    expiresIn: "8h",
  });

  return res
    .cookie("Authorization", token, {
      httpOnly: true,
    })
    .status(200)
    .json({
      message: "✅ Signed in successfully.",
    });
};
const signout = async (req, res) => {
    /*
      1. clear cookie
      2. send 200
      */
    res.clearCookie('Authorization').status(200).json({
        message:'✅ Successfully logged out.'
    });
  };

const authController = { signup, signin, signout };
export default authController;
