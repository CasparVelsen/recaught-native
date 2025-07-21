import dbConnect from "../../lib/dbConnect.js";
import Card from "../../models/Card.js";

export default async function handler(request, response) {
  await dbConnect();
  console.log("Connected to DB");

  if (request.method === "GET") {
    const cards = await Card.find();
    return response.status(200).json(cards);
  }

  if (request.method === "POST") {
    const result = await Card.create(request.body);
    return response.status(201).json(result);
  }

  if (request.method === "PUT") {
    const { _id, ...updateData } = request.body;

    if (!_id) {
      return response.status(400).json({ error: "Missing _id for update" });
    }

    try {
      const updatedCard = await Card.findByIdAndUpdate(_id, updateData, {
        new: true, // returns the updated document
        runValidators: true, // ensures the update follows schema rules
      });
      return response.status(200).json(updatedCard);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Update failed", details: error });
    }
  }

  if (request.method === "DELETE") {
    const { _id } = request.body;
    const result = await Card.findByIdAndDelete(_id);
    return response.status(200).json(result);
  }

  return response.status(405).json({ error: "Method not allowed" });
}
