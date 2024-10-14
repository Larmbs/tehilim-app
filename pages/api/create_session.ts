import { NextApiRequest, NextApiResponse } from "next";
import connection from "../db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
        const contacts: string = req.body.contacts;
        const max_chapters: number = req.body.contacts;
        
        const response = await connection.query("INSERT INTO sessions (name, email) VALUES (?, ?)", [name, email]);
        res.status(200)
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
