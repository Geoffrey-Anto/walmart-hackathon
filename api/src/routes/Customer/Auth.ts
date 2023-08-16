import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

type Customer = {
  id: number;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

const prisma = new PrismaClient();

const customerRouter = Router();

customerRouter.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newCustomer = await prisma.customer.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "CUSTOMER",
      },
    });

    res
      .status(201)
      .json({ message: "Registration successful", customer: newCustomer });
  } catch (error) {
    console.error("Error registering customer:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

customerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const customer = await prisma.customer.findUnique({ where: { email } });

    if (!customer) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: customer.id, role: customer.role, name: customer.name },
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

export default customerRouter;
