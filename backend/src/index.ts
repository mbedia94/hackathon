import * as express from "express";
import configureBot from "./bot";
import { connectDB } from "./mongo/connection";
import * as cors from "cors";
import menuRouter from "./routes/menuRoutes";
import orderRouter from "./routes/ordersRouters";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/menus", menuRouter);
app.use("/orders", orderRouter);

connectDB().then(() => console.log("Connected to database!"));

export const chatBot = configureBot();

const server = app.listen(3001, () => {
  console.log("Server is up and running ⚡");
});

chatBot.launch().then(() => console.log("Bot has started 🤖"));

process.once("SIGINT", () => {
  console.log("stopping");
  chatBot.stop();
  server.close();
});
process.once("SIGTERM", () => {
  console.log("stopping");
  chatBot.stop();
  server.close();
});
