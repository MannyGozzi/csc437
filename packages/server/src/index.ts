import express from "express";
import dotenv from "dotenv";
import DestinationsRoute from "./routes/destinations";
import ProfilesRoute from "./routes/profiles";
import AuthRoute from "./routes/auth";
import path from "path";
import { connect } from "./services/mongo";

dotenv.config();

const app = express();
const HOST_URL = process.env.HOST_URL;
const PORT = process.env.PORT;

connect(process.env.MONGO_DB_NAME as string);

/* Serve frontend code under proto package */
const protoPublicDirectory = path.join(__dirname, "../../proto/public");
app.use(express.json());
app.use(express.static(protoPublicDirectory));
app.use("/auth", AuthRoute);
app.use("/api/profiles", ProfilesRoute);
app.use("/api/destinations", DestinationsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${HOST_URL}:${PORT} 🔥`);
});
