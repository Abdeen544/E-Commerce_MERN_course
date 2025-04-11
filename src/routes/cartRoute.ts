import express from "express";
import { addItemToCart, checkout, clearCart, deleteItemInCart, getActiveCartForUser, updateItemInCart } from "../services/cartServices";
import validatJWT from "../middlewares/validateJWT";
import { Request } from "express";
import { ExtendRequest } from "../types/extendedRequest";

const router = express.Router();

router.get('/', validatJWT, async (req: ExtendRequest, res) => {
    try{
        const userID = req.user._id;
        const cart = await getActiveCartForUser({userID});
        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
})

router.post('/checkout', validatJWT, async (req: ExtendRequest, res) => {
    try{
        const userID = req.user._id;
        const {address} = req.body;
        const {data, statusCode} = await checkout({userID, address});
        res.status(statusCode).send(data);
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
});

router.post('/items', validatJWT, async (req: ExtendRequest, res) => {
    try {
        const userID = req?.user?._id;
        const {productID, quantity} = req.body;
        const {data, statusCode} = await addItemToCart({userID, productID, quantity});
        res.status(statusCode).send(data);
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
});

router.put('/items', validatJWT, async (req: ExtendRequest, res) => {
    try{
        const userID = req?.user?._id;
        const {productID, quantity} = req.body;
        const {data, statusCode} = await updateItemInCart({userID, productID, quantity});
        res.status(statusCode).send(data);
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
});

router.delete('/', validatJWT, async (req: ExtendRequest, res) => {
    try{
        const userID = req?.user?._id;
        const {data, statusCode} = await clearCart({userID});
        res.status(statusCode).send(data);
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
});

router.delete('/items/:productID', validatJWT, async (req:ExtendRequest, res) => {
    try{
        const userID = req?.user?._id;
        const {productID} = req.params;
        const {data, statusCode} = await deleteItemInCart({userID, productID});
        res.status(statusCode).send(data);
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
});

export default router