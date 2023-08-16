import { Router } from "express";
import authRouter from "./Auth";

const CustomerRouter = Router();

CustomerRouter.use("/auth", authRouter);

export default CustomerRouter;
