import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../context/Cart/CartContext";
import Box from "@mui/material/Box";

const CartPage = () => {
    const {token} = useAuth();
    const {cartItems, totalAmount} = useCart();
    const [err, setError] = useState('');

    // useEffect(()=>{
    //     if(!token){
    //         return;
    //     }

    //     const fetchCart = async () => {
    //         const response = await fetch(`${BASE_URL}/cart`,{
    //             headers:{
    //                 'Authorization': `Bearer ${token}` 
    //             }
    //         });

    //         if(!response.ok){
    //             setError("Failed to fetch user cart!");
    //         }

    //         const data = await response.json();
    //         setCart(data);
    //     };

    //     fetchCart();
    // }, [token]);

    return (
        <Container sx={{mt:2}}>
            <Typography variant="h4">My Cart</Typography>
            {cartItems.map((item) => (
                <Box>{item.title}</Box>
            ))}
        </Container>
    )
}

export default CartPage;