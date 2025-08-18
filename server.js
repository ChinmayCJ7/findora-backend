import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (replace with your Atlas connection string)
mongoose.connect("mongodb+srv://chinnu:chinnu12@mycluster.uxvwz.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({
  name: String,
  place: String,
});

const Item = mongoose.model("Item", ItemSchema);

// Routes
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const { name, place } = req.body;
  const newItem = new Item({ name, place });
  await newItem.save();
  res.json(newItem);
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
