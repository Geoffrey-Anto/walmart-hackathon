import { Router } from "express";
import authRouter from "./Auth";
import OrderRouter from "./Order";

const AdminRouter = Router();

AdminRouter.use("/auth", authRouter);
AdminRouter.use("/order", OrderRouter);

export default AdminRouter;
