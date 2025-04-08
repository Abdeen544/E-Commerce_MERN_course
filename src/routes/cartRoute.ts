import express from "express";
import { getActiveCartForUser } from "../services/cartServices";
import validatJWT from "../middlewares/validateJWT";
import { Request } from "express";

const router = express.Router();

interface ExtendRequest extends Request{
    user?: any
}

router.get('/', validatJWT, async (req: ExtendRequest, res) => {
    const userID = req.user._id;
    const cart = await getActiveCartForUser({userID});
    res.status(200).send(cart);
})

export default router