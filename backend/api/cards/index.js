import dbConnect from "../../lib/dbConnect.js";
import Card from "../../models/Card.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export default async function handler(request, response) {
  await dbConnect();

  // Prüfe JWT bei allen Methoden außer OPTIONS
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ message: "No token provided" });
  }

  let userId;
  try {
    const token = authHeader.replace("Bearer", "").trim();
    const decoded = jwt.verify(token, JWT_SECRET);
    userId = decoded.sub;
  } catch (err) {
    return response.status(401).json({ message: "Invalid token" });
  }

  switch (request.method) {
    case "GET": {
      const cards = await Card.find({ author: userId }).sort({ createdAt: -1 });
      return response.status(200).json(cards);
    }

    case "POST": {
      const newCard = await Card.create({ ...request.body, author: userId });
      return response.status(201).json(newCard);
    }

    case "PUT": {
      const { _id, ...updateData } = request.body;
      if (!_id) {
        return response.status(400).json({ error: "Missing _id for update" });
      }
      const updatedCard = await Card.findOneAndUpdate(
        { _id, author: userId }, // Sicherheitsfilter: nur eigene Karten
        updateData,
        { new: true, runValidators: true }
      );
      return response.status(200).json(updatedCard);
    }

    case "DELETE": {
      const { _id } = request.body;
      const result = await Card.findOneAndDelete({ _id, author: userId });
      return response.status(200).json(result);
    }

    default:
      return response.status(405).json({ error: "Method not allowed" });
  }
}
