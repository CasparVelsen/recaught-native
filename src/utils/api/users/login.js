import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not set");
}

const loginHandler = async (request, response) => {
  const { method } = request;

  if (method !== "POST") {
    return response
      .status(405)
      .json({ code: 405, message: "Method not allowed" });
  }

  const { username, password } = request.body;

  if (!(username && password)) {
    return response
      .status(404)
      .json({ code: 404, message: "Name and password required" });
  }

  await dbConnect();
  console.log("Connected to DB");

  const foundUser = await User.findOne({ username });

  console.log(foundUser);

  if (!foundUser) {
    return response.status(404).json({ code: 401, message: "Unauthorized" });
  }

  const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

  if (!isPasswordMatch) {
    return response.status(401).json({ code: 401, message: "Unauthorized" });
  }

  const token = jwt.sign({ sub: foundUser._id }, JWT_SECRET);

  response.status(200).json({ token });
};

export default loginHandler;
