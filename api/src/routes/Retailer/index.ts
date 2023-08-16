import { Router } from "express";
import authRouter from "./Auth";
import OrderRouter from "./Order";

const RetailerRouter = Router();

RetailerRouter.use("/auth", authRouter);
RetailerRouter.use("/order", OrderRouter);

export default RetailerRouter;
