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

    const ordered = await prisma.retailer.findUnique({
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

OrderRouter.post("/get-all-available", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  const tokenData = token.split(" ")[1];

  try {
    const data = jwt.verify(tokenData, process.env.JWT_SECRET as string);
    const { adminId } = req.body;

    const ordered = await prisma.admin.findUnique({
      where: {
        id: Number(adminId),
      },
      include: {
        products: true,
      },
    });

    if (!ordered) {
      return res.status(401).send("No admin found");
    }

    return res.status(200).json(ordered.products);
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
    const { productId } = req.body;

    if (!productId) {
      return res.status(401).send("Please provide product id");
    }

    const ordered = await prisma.retailer.update({
      where: {
        id: Number(id),
      },
      data: {
        products: {
          connect: {
            id: Number(productId),
          },
        },
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

export default OrderRouter;
