import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import { seedInitialProducts } from "./services/productService";
import productRoute from "./routes/productRoutes";

const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce").then(()=>{console.log("MongoDB connect")}).catch(err=>{console.log("failed to connect", err)});

//Seed initial products in the data base
seedInitialProducts();

app.use('/users', userRoute);
app.use('/products', productRoute);

app.listen(port, ()=>{console.log(`Server is running at: http://localhost:${port}`)});