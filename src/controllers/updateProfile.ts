import { Request, Response } from "express";
import authservice from "../service/updateProfile";
const updateProfile=(req:Request,res:Response)=>{
    authservice.updateProfile()
}