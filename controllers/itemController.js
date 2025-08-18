import Item from "../models/itemModel.js";

// @desc   Get all items
// @route  GET /api/items
export const getItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

// @desc   Add new item
// @route  POST /api/items
export const addItem = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const item = await Item.create({ name, description });
  res.status(201).json(item);
};

// @desc   Update item
// @route  PUT /api/items/:id
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(updatedItem);
};

// @desc   Delete item
// @route  DELETE /api/items/:id
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  const deletedItem = await Item.findByIdAndDelete(id);

  if (!deletedItem) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json({ message: "Item deleted successfully" });
};
