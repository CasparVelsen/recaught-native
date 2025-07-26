import dbConnect from "../../lib/dbConnect.js";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import loginHandler from "./login.js";

async function handler(request, response) {
  await dbConnect();
  console.log("Connected to DB");

  if (request.url === "/login") {
    return loginHandler(request, response);
  }

  if (request.method === "GET") {
    const users = await User.find();
    return response.status(200).json(users);
  }

  if (request.method === "POST") {
    const { username, password, firstname, lastname } = request.body;
    const hashedPassword = bcrypt.hashSync(password, 12);
    const result = await User.create({
      username,
      password: hashedPassword,
      firstname,
      lastname,
    });
    return response.status(201).json(result);
  }

  return response.status(405).json({ message: "Method not allowed" });
}

export default handler;
