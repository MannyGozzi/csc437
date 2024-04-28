import express from "express";
import dotenv from "dotenv";
import DestinationsRoute from "./routes/destinations";
import path from "path";
dotenv.config();

const app = express();
const HOST_URL = process.env.HOST_URL;
const PORT = process.env.PORT;

/* Serve frontend code under proto package */
const protoPublicDirectory = path.join(__dirname, "../../proto/public");
app.use(express.static(protoPublicDirectory));

app.use("/api/destinations", DestinationsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${HOST_URL}:${PORT} 🔥`);
});
