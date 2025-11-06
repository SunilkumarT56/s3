import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Image from "./Image.js";
import { v4} from "uuid";
import fileUpload from "express-fileupload";
import { putObject } from "./putObject.js";
import multer from "multer";

dotenv.config();
console.log({
  region: process.env.AWS_REGION,
  access: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_KEY ? "Loaded ✅" : "Missing ❌",
});

try {
  mongoose.connection.on("connected", () => {
    console.log("mongodb is connected");
  });
  mongoose.connect(`${process.env.MONGO_URI}/s3-images`);
} catch (error) {
  console.log(error);
}

const app = express();
app.use(express.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/postImages", upload.single("image"), async (req, res) => {
  const { name } = req.body;
  const file = req.file;
  const filename = "images/" + v4();
  console.log(filename);
  if (!name || !file) {
    res.json({
      status: false,
      message: "required fields",
    });
  }
  const { url, Key } = await putObject(file.buffer, filename);
  console.log(url, Key);
});

app.listen(3000, () => {
  console.log(`app is up and running on port 3000`);
});
