import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ImageUrl: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
export default Image;
