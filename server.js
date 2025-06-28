import express from "express";
import http from "http";
import dotenv from "dotenv";
import taskRouter from "./routes/taskRoute.js";
import connectDb from "./config/dbConnect.js";
import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";
import upload from "./upload.js"; // Import the multer upload configuration
import User from "./models/userModel.js"; // Import the User model

dotenv.config();
connectDb();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT;


app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", taskRouter);

app.put('/api/upload-profile/:id', upload.single('profile'),async (req, res) => {
  const userId = req.params.id;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

 const user = await User.findByIdAndUpdate(userId,{avatar:`http://localhost:5000/uploads/${req.file.filename}`});
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await user.save();
  res.json({
    message: 'Upload successful!',
    filename: req.file.filename,
    // path: req.file.path,
  });
});
app.use('/uploads', express.static('uploads'));
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
