import express from "express";
import { getAllUsers,createUser,getUserById,updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/",getAllUsers)
userRouter.get("/:id",getUserById)
userRouter.post("/",createUser)
userRouter.patch("/:id",updateUser)

export default userRouter;