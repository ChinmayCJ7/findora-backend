import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import itemRoutes from "./routes/itemRoutes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

// CORS for your React dev server
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// Healthcheck
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Routes
app.use("/api/items", itemRoutes);

// 404 + Error handlers
app.use(notFound);
app.use(errorMiddleware);

// Start
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
