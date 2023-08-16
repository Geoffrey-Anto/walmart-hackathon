import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import AdminRouter from "./routes/Admin";
import CustomerRouter from "./routes/Customer";
import RetailerRouter from "./routes/Retailer";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use("/admin", AdminRouter);
app.use("/customer", CustomerRouter);
app.use("/retailer", RetailerRouter);

app.listen(PORT, () => {
  console.log("Server running on port 3001");
});
