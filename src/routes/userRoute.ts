import express, { request, response } from "express";
import { login, register } from "../services/userService";

const router = express.Router();

router.post('/register', async (req, res)=>{
    const {firstName, lastName, email, password} = req.body;
    const {data, statusCode} = await register({firstName, lastName, email, password});
    res.status(statusCode).send(data);
});

router.post('/login', async (request, response)=>{
    const {email, password} = request.body;
    const {data, statusCode} = await login({email, password});
    response.status(statusCode).send(data);
})

export default router;