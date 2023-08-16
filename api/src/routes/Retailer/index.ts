import { Router } from "express";
import authRouter from "./Auth";

const RetailerRouter = Router();

RetailerRouter.use("/auth", authRouter);

export default RetailerRouter;
