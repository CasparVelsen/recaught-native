import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/dbConnect.js";
import User from "../../models/User.js";

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) throw new Error("JWT_SECRET not set");

const loginHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  await dbConnect();

  const foundUser = await User.findOne({ username: username.trim() });
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ sub: foundUser._id }, JWT_SECRET);
  return res.status(200).json({ token }); // << HIER wichtig!
};

export default loginHandler;
