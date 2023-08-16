import { Router } from "express";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const OrderRouter = Router();
const prisma = new PrismaClient();

OrderRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  const tokenData = token.split(" ")[1];

  try {
    const data = jwt.verify(tokenData, process.env.JWT_SECRET as string);
    const { id } = data as any;

    const ordered = await prisma.admin.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        products: true,
      },
    });
    return res.status(200).json(ordered);
  } catch (error) {
    return res.status(401).send("Error");
  }
});

OrderRouter.post("/", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  const tokenData = token.split(" ")[1];

  try {
    const data = jwt.verify(tokenData, process.env.JWT_SECRET as string);
    const { id } = data as any;

    const { name, price, quantity } = req.body;

    if (!name || !price || !quantity) {
      return res.status(401).send("Please fill all the fields");
    }

    const ordered = await prisma.supplierProduct.create({
      data: {
        name,
        price,
        quantity,
        Admin: {
          connect: {
            id: Number(id),
          },
        },
      },
    });

    return res.status(200).json(ordered);
  } catch (error) {
    return res.status(401).send("Error");
  }
});

export default OrderRouter;
