import dbConnect from "../../lib/dbConnect.js";
import User from "../../models/User.js";
import bcrypt from "bcrypt";

async function handler(request, response) {
  await dbConnect();
  console.log("Connected to DB");

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
    response.json(result);
    return;
  }
}

export default handler;
