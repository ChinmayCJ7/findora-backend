import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import itemRoutes from "./routes/itemRoutes.js";
import { notFound } from "./middlewares/notFound.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

// ✅ CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local dev
      "https://findora-wine.vercel.app", // ✅ your Vercel frontend
    ],
    credentials: true,
  })
);


// ✅ Body Parser
app.use(express.json());

// ✅ Healthcheck Route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// ✅ API Routes
app.use("/api/items", itemRoutes);

// ✅ Error Handlers
app.use(notFound);
app.use(errorMiddleware);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
});
