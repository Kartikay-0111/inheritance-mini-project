import express from "express";
import { getAllUsers,createUser,getUserById } from "../controllers/user.controller.js";
import jwtCheck from "../middleware/jwtcheck.js";

const userRouter = express.Router();

userRouter.get("/",getAllUsers)
userRouter.get("/:id",getUserById)
userRouter.post("/",createUser)

export default userRouter;