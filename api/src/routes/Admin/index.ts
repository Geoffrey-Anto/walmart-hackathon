import { Router } from "express";
import authRouter from "./Auth";

const AdminRouter = Router();

AdminRouter.use("/auth", authRouter);

export default AdminRouter;
