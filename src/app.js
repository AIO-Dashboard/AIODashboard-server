import express from "express";
import morgan from "morgan";
import cors from "cors";

import orderRoutes from "./routes/order.routes.js";

import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
