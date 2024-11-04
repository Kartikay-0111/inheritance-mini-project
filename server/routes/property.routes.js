import express from 'express'
import multer from 'multer';
import {getAllproperties,getPropertyBydetail,createProperty,updateProperty,deleteProperty} from "../controllers/property.controller.js";

const upload = multer({ storage: multer.memoryStorage() });
const propertyRouter = express.Router();

propertyRouter.get("/",getAllproperties);
propertyRouter.get("/:id",getPropertyBydetail);
propertyRouter.post("/", upload.single('image'),createProperty);
propertyRouter.patch("/:id",upload.single('image'),updateProperty);
propertyRouter.delete("/:id",deleteProperty);

export default propertyRouter;