import express from "express";
import { getAllUsers,createUser,getUserById } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/",getAllUsers)
userRouter.get("/:id",getUserById)
userRouter.get("/",createUser)

export default userRouter;