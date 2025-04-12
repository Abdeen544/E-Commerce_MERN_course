import express, { request, response } from "express";
import { login, register } from "../services/userService";

const router = express.Router();

router.post('/register', async (req, res)=>{
    try {
        const {firstName, lastName, email, password} = req.body;
        const {data, statusCode} = await register({firstName, lastName, email, password});
        res.status(statusCode).send(data);
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
});

router.post('/login', async (req, res)=>{
    try{
        const {email, password} = req.body;
        const {data, statusCode} = await login({email, password});
        res.status(statusCode).send(data);
    } catch (err) {
        res.status(500).send("Something went wrong!");
    }
})

export default router;