import express from 'express'
import {getAllproperties,getPropertyBydetail,createProperty,updateProperty,deleteProperty} from "../controllers/property.controller.js"

const propertyRouter = express.Router();

propertyRouter.get("/",getAllproperties);
propertyRouter.get("/:id",getPropertyBydetail);
propertyRouter.post("/",createProperty);
propertyRouter.patch("/",updateProperty);
propertyRouter.delete("/:id",deleteProperty);

export default propertyRouter;