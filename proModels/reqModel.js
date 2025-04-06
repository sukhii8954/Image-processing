import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({
  inputUrl: String,
  outputUrl: String,
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "failed"],
    default: "pending",
  },
});

const reqSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  productName: String,
  images: [imgSchema],
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "failed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Request = mongoose.model("Request" , reqSchema);

export default Request;
