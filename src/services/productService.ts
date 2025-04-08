import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
    return await productModel.find();
}

export const seedInitialProducts = async () => {
    const initialProducts = [
        {title: "Dell Laptop", image: "https://imgs.search.brave.com/YlOpeacZffMS97esMXhKW0Q6ch-kSmCViYdEfMfQuWw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIz/NzA5MzcxMC9waG90/by9hLWRlbGwteHBz/LTEzLTItaW4tMS1s/YXB0b3AtY29tcHV0/ZXItdGFrZW4tb24t/bWFyY2gtMTYtMjAy/MS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9MDZnZVFicno4/bkZaNldoTFdmbUJu/MkhsbnlEbWR4ZU9N/eXhhaTJFdXEwMD0", price: 40000, stock: 10}
    ];

    const products = await getAllProducts();

    if(products.length === 0){
        await productModel.insertMany(initialProducts);
    }
}