import { Item } from "../models/Item.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET /api/items
export const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

// POST /api/items
export const addItem = asyncHandler(async (req, res) => {
  const { name, location, notes, photoUrl } = req.body;
  if (!name || !location) {
    return res.status(400).json({ error: "name and location are required" });
  }
  const created = await Item.create({ name, location, notes, photoUrl });
  res.status(201).json(created);
});

// PUT /api/items/:id
export const updateItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, location, notes, photoUrl } = req.body;

  const updated = await Item.findByIdAndUpdate(
    id,
    { name, location, notes, photoUrl },
    { new: true, runValidators: true }
  );

  if (!updated) return res.status(404).json({ error: "Item not found" });
  res.json(updated);
});

// DELETE /api/items/:id
export const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Item.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Item not found" });
  res.json({ message: "Item deleted successfully" });
});
