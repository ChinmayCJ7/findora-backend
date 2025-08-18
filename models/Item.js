import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    notes: { type: String, trim: true },      // optional
    photoUrl: { type: String, trim: true }    // optional (for Phase 3/4)
  },
  { timestamps: true }
);

export const Item = mongoose.model("Item", itemSchema);
