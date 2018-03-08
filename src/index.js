import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bluebird from "bluebird";

import auth from "./routers/auth";
import users from "./routers/users";
import items from "./routers/items";

dotenv.config();
const app = express();
app.use(bodyParser.json());
mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGODB_URL);

app.use(
  "/static",
  express.static(path.join(__dirname, "/client/static"))
);

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/items", items);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

app.listen(process.env.HOST_PORT, () =>
  console.log(`running in localhost: ${process.env.HOST_PORT}`)
);
