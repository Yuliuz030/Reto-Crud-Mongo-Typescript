import { Request, Response, NextFunction } from "express";
import config from "./config";

export const decodeToken = async (_req: Request, res: Response, next: NextFunction) => {
    const token = _req.headers.authorization?.split(" ")[1];
    try {
        if (token === undefined) {
            return res.status(401).json({ message: "Unauthorized" });
        } else {
            const decodeValue = await config.admin.auth().verifyIdToken(token);

            if (decodeValue != null || decodeValue != undefined) {
                return next();
            }
            return res.json({ message: "Unauthorized" });
        }
    } catch (error) {
        if (error.code === "auth/id-token-expired"){
            return res.json({ message: "Token Expired" }).status(400);
        }else if(error.code == "auth/argument-error"){
            return res.json({ message: "Invalid Token"}).status(400);
        }else{
            return res.json({ message: "Internal Server Error" }).status(500);
        }
    }
}
