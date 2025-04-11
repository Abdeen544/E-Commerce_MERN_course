import express from "express";
import { addItemToCart, getActiveCartForUser, updateItemInCart } from "../services/cartServices";
import validatJWT from "../middlewares/validateJWT";
import { Request } from "express";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get('/', validatJWT, async (req: ExtendRequest, res) => {
    const userID = req.user._id;
    const cart = await getActiveCartForUser({userID});
    res.status(200).send(cart);
})

router.post('/items', validatJWT, async (req: ExtendRequest, res) => {
    const userID = req?.user?._id;
    const {productID, quantity} = req.body;
    const {data, statusCode} = await addItemToCart({userID, productID, quantity});
    res.status(statusCode).send(data);
});

router.put('/items', validatJWT, async (req: ExtendRequest, res) => {
    const userID = req?.user?._id;
    const {productID, quantity} = req.body;
    const {data, statusCode} = await updateItemInCart({userID, productID, quantity});
    res.status(statusCode).send(data);
});

export default router