import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import jwt directly
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, name, role } = req.body;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
      },
    });

    res
      .status(201)
      .json({ message: "Registration successful", admin: newAdmin });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role, name: admin.name },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Login failed" });
  }
});

export default authRouter;
