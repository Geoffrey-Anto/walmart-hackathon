import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

type Retailer = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

const prisma = new PrismaClient();

const retailerRouter = Router();

retailerRouter.post("/register", async (req, res) => {
  const { email, password, name, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newRetailer = await prisma.retailer.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    res
      .status(201)
      .json({ message: "Registration successful", retailer: newRetailer });
  } catch (error) {
    console.error("Error registering retailer:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

retailerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const retailer = await prisma.retailer.findUnique({ where: { email } });

    if (!retailer) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, retailer.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: retailer.id, role: retailer.role, name: retailer.name },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

export default retailerRouter;
