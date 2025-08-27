import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;
const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  console.error("❌ Missing MONGODB_URI in .env");
  process.exit(1);
}

await connectDB(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
