import { Box, TextField, Button } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { login } from "../utils/authUtils";
import EmailTextField from "./EmailTextField";
import { useDispatch } from "react-redux";
import { setUserName } from "../redux/reducers/UserReducer";

interface LoginModalProps {
    closeModal : () => void,
    moveToSignUp : () => void
}

const Login = (props : LoginModalProps) => {

  //  const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
 //   const [emailValidity, setEmailValidity] = useState<boolean>(true)
    const [modalUserName, setModalUserName] = useState<string>('')
    const dispatch = useDispatch();

    const handleLogin = async () => {
        // Add your login logic here
        console.log('Logging in with:', { modalUserName, password });
        await login({userName: modalUserName, password : password}).then(res => {
            if (res.status === 200) {
                console.log(res.data)
                dispatch(setUserName(res.data.userName))
                props.closeModal();
            }
        }).catch(err=> {console.log(err)})
      };

    const handleSubmit = (e) => {
        e.preventDefault();
       // emailValidity && handleLogin();
       handleLogin();
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {/* <EmailTextField setEmail={setEmail} setValidity={setEmailValidity}/> */}
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