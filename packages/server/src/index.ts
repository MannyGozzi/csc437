import express from "express";
import dotenv from "dotenv";
import DestinationsRoute from "./routes/destinations";
import ProfilesRoute from "./routes/tours";
import AuthRoute, { authenticateUser } from "./routes/auth";
import path from "path";
import { connect } from "./services/mongo";
import fs from "node:fs/promises"
import { Request, Response } from "express";

dotenv.config();

const app = express();
const HOST_URL = process.env.HOST_URL;
const PORT = process.env.PORT;
const staticDir = path.resolve(__dirname, process.env.STATIC as string);
console.log('Static Dir Path: ', staticDir)
connect(process.env.MONGO_DB_NAME as string);

/* Make non standard node_modules available */
const nodeModules = path.resolve(__dirname, "../node_modules");
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));

/* Serve frontend code under proto package */
const protoPublicDirectory = path.join(__dirname, "../../proto/public");
app.use(express.json());
app.use(express.static(protoPublicDirectory));
app.use("/auth", AuthRoute);
app.use("/api/tour", ProfilesRoute);
app.use("/api/destinations", DestinationsRoute);
app.use("/app", (_: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${HOST_URL}:${PORT} 🔥`);
});
