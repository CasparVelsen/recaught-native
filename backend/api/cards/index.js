import dbConnect from "../../lib/dbConnect.js";
import Card from "../../models/Card.js";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export default async function handler(req, res) {
  await dbConnect();

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  let userId;
  try {
    const token = authHeader.replace("Bearer", "").trim();
    const decoded = jwt.verify(token, JWT_SECRET);
    userId = decoded.sub;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }

  switch (req.method) {
    case "GET": {
      try {
        const cards = await Card.find({ author: userId }).sort({
          createdAt: -1,
        });
        return res.status(200).json(cards);
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Fehler beim Laden der Karten" });
      }
    }

    case "POST": {
      try {
        const newCard = await Card.create({
          ...req.body,
          author: userId,
        });
        return res.status(201).json(newCard);
      } catch (err) {
        console.error("POST Error:", err);
        return res
          .status(400)
          .json({ message: "Fehler beim Erstellen der Karte" });
      }
    }

    case "PUT": {
      const { _id, ...updateData } = req.body;
      if (!_id) {
        return res.status(400).json({ error: "Missing _id for update" });
      }
      try {
        const updatedCard = await Card.findOneAndUpdate(
          { _id, author: userId },
          updateData,
          { new: true, runValidators: true }
        );
        return res.status(200).json(updatedCard);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Fehler beim Aktualisieren der Karte" });
      }
    }

    case "DELETE": {
      const { _id } = req.body;
      if (!_id) {
        return res.status(400).json({ error: "Missing _id for delete" });
      }
      try {
        const result = await Card.findOneAndDelete({ _id, author: userId });
        return res.status(200).json(result);
      } catch (err) {
        return res.status(400).json({ message: "Fehler beim Löschen" });
      }
    }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
