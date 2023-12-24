import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { login } from "../utils/authUtils";
import EmailTextField from "./EmailTextField";

interface LoginModalProps {
    closeModal : () => void,
    moveToSignUp : () => void
}

export interface LoginProps {
    email : string,
    password : string
}

const Login = (props : LoginModalProps) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailValidity, setEmailValidity] = useState<boolean>(true)

    const handleLogin = async () => {
        // Add your login logic here
        console.log('Logging in with:', { email, password });
        await login({email: email, password : password}).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                props.closeModal();
            }
        }).catch(err=> {console.log(err)})
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        emailValidity && handleLogin();
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <EmailTextField setEmail={setEmail} setValidity={setEmailValidity}/>
            <TextField margin="normal" required fullWidth name="password" label="Password"
            type="password" id="password" autoComplete="current-password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" fullWidth variant="contained"> Login </Button>
        </Box>
    )
}

export default Login;