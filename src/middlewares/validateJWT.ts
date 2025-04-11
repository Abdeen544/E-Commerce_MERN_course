import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";

const validatJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.get("authorization");
    
    if(!authorizationHeader){
        res.status(403).send("Authorization header wasn't provided!");
        return;
    }

    const token = authorizationHeader.split(" ")[1];

    if(!token){
        res.status(403).send("Bearer token not found!");
        return
    }

    jwt.verify(token, 'Lq:C#;]vKHrYGHliYt6ZJ=%Hq.l:p(', async (err, payload)=>{
        if(err){
            res.status(403).send("Invalid token");
            return
        }

        if(!payload){
            res.status(403).send("Invalid toekn payload");
        }

        const userPayload = payload as {
            email: string,
            firstName: string,
            lastName: string
        }

        //Fetch user from the data based on the payload.
        const user = await userModel.findOne({email: userPayload.email});
        req.user = user;
        next();
    });
}

export default validatJWT;