import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { Product } from "../types/Products"
import { Box } from "@mui/material"

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [err, setError] = useState(false);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch("http://localhost:3001/products");
                const data = await response.json();
                setProducts(data)
            } catch{
                setError(true);
            }
        }
        fetchData();
    }, []);

    if(err){
        return <Box>Something went wrong, please try again.</Box>;
    }

    return <Container>
        <Grid container spacing={2} m={4}>
            {products.map(p=>(
                <Grid><ProductCard {...p}/></Grid>
            ))}
        </Grid>
    </Container>
}

export default HomePage