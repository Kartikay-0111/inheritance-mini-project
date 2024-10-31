// authMiddleware.js
import { OAuth2Client } from "google-auth-library";
import * as dotenv from 'dotenv';
dotenv.config();
const client = new OAuth2Client(process.env.CLIENT_ID);

export async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, token missing" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID, // Specify the client ID of the app that accesses the backend
    });

    const payload = ticket.getPayload(); // User info in the payload
    req.user = payload; // Attach user data to request
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(403).json({ error: "Unauthorized, token invalid" });
  }
}
