import { Box, TextField, Button } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import useAuth from "../hooks/useAuth";

interface LoginModalProps {
    closeModal : () => void,
    moveToSignUp : () => void,
    setErrorLine : Dispatch<SetStateAction<string | undefined>>
}

const Login = (props : LoginModalProps) => {

    const [password, setPassword] = useState<string>('');
    const [modalUserName, setModalUserName] = useState<string>('')
    const { login } = useAuth();

    const handleLogin = async () => {
        props.setErrorLine(undefined)
        await login({userName: modalUserName, password : password}).then(res => {
            if (res.status === 200) {
                props.closeModal();
            }
            else {
                props.setErrorLine(res.data as string);
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField required fullWidth autoComplete="userName" label="User Name" value={modalUserName}
         onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setModalUserName(e.target.value)}/>
            <TextField margin="normal" required fullWidth name="password" label="Password"
            type="password" id="password" autoComplete="current-password" value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" fullWidth variant="contained"> Login </Button>
        </Box>
    )
}

export default Login;