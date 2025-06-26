import express from "express";
import http from "http";
import dotenv from "dotenv";
import taskRouter from "./routes/taskRoute.js"
import connectDb from "./config/dbConnect.js"
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";

dotenv.config();
connectDb();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT ;

app.use(express.json());
app.use(cors());

app.use("/api",taskRouter);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
