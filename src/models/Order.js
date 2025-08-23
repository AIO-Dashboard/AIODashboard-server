import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default model("Order", orderSchema);
