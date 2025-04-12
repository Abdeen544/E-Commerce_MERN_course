import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseURL";

const RegisterPage = () => {
    const [err, setError] = useState("");

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        //Make call to API to create the user
        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers:{
                'Content-type': "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        });

        if(!response.ok){
            setError("Unable to register user, please try different credientials!");
            return;
        }
        setError("");

        const data = await response.json();

        console.log(data);
    }

    return (
        <Container>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mt: "4"}}>
                <Typography variant="h4">Register New Acount</Typography>
                <Box sx={{display: "flex", flexDirection: "column", gap: 2, mt: 2, border: 1, borderColor: "#f5f5f5", p: 1}}>
                    <TextField inputRef={firstNameRef} label="First Name" name="fullName"></TextField>
                    <TextField inputRef={lastNameRef} label="Last Name" name="fullName"></TextField>
                    <TextField inputRef={emailRef} label="Email" name="email"></TextField>
                    <TextField inputRef={passwordRef} type="password" label="Password" name="password"></TextField>
                    <Button onClick = {onSubmit} variant="contained">Register</Button>
                    {err && <Typography sx={{color: "red"}}>{err}</Typography>}
                </Box>
            </Box>
        </Container>
    );
}

export default RegisterPage;