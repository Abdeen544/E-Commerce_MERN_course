import { cartModel } from "../models/cartModel";
import { productModel } from "../models/productModel";

interface createCartParams{
    userID: string
}

interface activeCartParams{
    userID: string
}

interface AddCartParams{
    productID: any,
    quantity: number,
    userID: string,
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

export const addItemToCart = async ({productID, quantity, userID}: AddCartParams) => {
    const cart = await getActiveCartForUser({userID});

    //Does item exists in cart
    const existsInCart = cart.items.find(p=>p.product.toString() === productID);

    if(existsInCart){
        return {data: "Items already exists in cart!", statusCode: 400}
    }

    //Fetch the product
    const product = await productModel.findById(productID);

    if(!product){
        return {data: "Product not found!", statusCode: 400};
    }

    if(product.stock < quantity){
        return {data: "Low stock for item", statusCode: 400}
    }

    cart.items.push({product: productID, unitPrice: product.price, quantity: quantity});

    //Update total number of items
    cart.totalAmount += product.price * quantity

    const updateCart = await cart.save();

    return {data: updateCart, statusCode: 200};
}