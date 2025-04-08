import { cartModel } from "../models/cartModel";

interface createCartParams{
    userID: string
}

interface activeCartParams{
    userID: string
}

const createCartForUser = async ({userID}: createCartParams) => {
    const cart = await cartModel.create({userID, totalAmount: 0});
    await cart.save();
    return cart;
}

export const getActiveCartForUser = async ({userID}: activeCartParams) => {
    let cart = await cartModel.findOne({userID, status: "active"});
    if(!cart){
        cart = await createCartForUser({userID});
    }
    return cart;
}