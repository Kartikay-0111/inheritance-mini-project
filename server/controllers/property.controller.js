import {User} from "../models/user.js";
import {Property} from "../models/property.js";

const getAllproperties = async (req, res) => {}
const getPropertyBydetail = async (req, res) => {}

const createProperty = async (req, res) => {
    const {title,description,propertyType,location,price,photo,email} = req.body;

    

}
const updateProperty = async (req, res) => {}
const deleteProperty = async (req, res) => {}

export{
    getAllproperties,getPropertyBydetail,createProperty,updateProperty,deleteProperty,
}