import { Box, TextField, Button } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { login } from "../utils/authUtils";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/UserReducer";
import { AxiosError } from "axios";
import Cookies from 'universal-cookie';

interface LoginModalProps {
    closeModal : () => void,
    moveToSignUp : () => void,
    setErrorLine : Dispatch<SetStateAction<string | undefined>>
}

const Login = (props : LoginModalProps) => {

    const [password, setPassword] = useState<string>('');
    const [modalUserName, setModalUserName] = useState<string>('')
    const dispatch = useDispatch();

    const handleLogin = async () => {
        console.log('Logging in with:', { modalUserName, password });
        await login({userName: modalUserName, password : password}).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                const cookies = new Cookies();
                cookies.set('refresh_token', res.data.refreshToken)
                cookies.set('access_token', res.data.accessToken)
                dispatch(setUser(res.data))
                props.closeModal();
            }
        }).catch((err : AxiosError) => {
            console.log(err);
            props.setErrorLine(err.response?.data as string);
        })
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