import { FC, PropsWithChildren, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/CartItem";
import { BASE_URL } from "../../constants/baseURL";
import { useAuth } from "../Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({children}) => {
    const {token} = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [err, setError] = useState('');

    const addItemToCart = async (productID: string) => {
        try{
            const response = await fetch(`${BASE_URL}/cart/items`, {
                method: "POST",
                headers:{
                    'Content-type': "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    productID,
                    quantity: 1
                })
            });

            if(!response.ok){
                setError('Failed to add to cart!');
            }

            const cart = await response.json();

            if(!cart){
                setError("Failed to parse cart data")
            }

            const cartItemsMap = cart.items.map(({product, quantity}: {product: any, quantity: number}) => ({
                productID: product._id,
                title: product.title,
                image: product.image,
                quantity,
                unitPrice: product.unitPrice
            }));

            setCartItems([...cartItemsMap]);
            setTotalAmount(cart.totalAmount);
        } catch {

        }
    }

    return (
        <CartContext.Provider value={{cartItems, totalAmount, addItemToCart}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;