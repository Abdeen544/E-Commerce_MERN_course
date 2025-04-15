import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseURL";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [err, setError] = useState("");

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const {login} = useAuth();

    const onSubmit = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if(!email || !password){
            setError("Set submitted data");
            return;
        }

        //Make call to API to create the user
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers:{
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if(!response.ok){
            setError("Unable to login user, please try different credientials!");
            return;
        }
        setError("");

        // const tokenText = await response.json();
        // const token = JSON.stringify(tokenText);

        const token = await response.json();

        if(!token){
            setError("Incorrect token!");
            return; 
        }
        
        login(email, token);
        navigate('/');
    }

    return (
        <Container>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: "4"}}>
                <Typography variant="h4">Login to your Acount</Typography>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2, mt: 2, border: 1, borderColor: "#f5f5f5", p: 1}}>
                    <TextField inputRef={emailRef} label="Email" name="email"></TextField>
                    <TextField inputRef={passwordRef} type="password" label="Password" name="password"></TextField>
                    <Button onClick = {onSubmit} variant="contained">Login</Button>
                    {err && <Typography sx={{color: "red"}}>{err}</Typography>}
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;