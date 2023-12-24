import { Box, TextField, Button, Typography } from "@mui/material"
import { useState } from "react"
import EmailTextField from "./EmailTextField"
import { register } from "../utils/authUtils"
import { AxiosError } from "axios"

interface SignUpModalProps {
    moveToLogin : () => void
}

interface User {
    email : string,
    userName : string,
    password : string,
    iconUrl : string
}

const SignUp = (props : SignUpModalProps) => {
    const [user, setUser] = useState<User>({email:'',iconUrl:'',password:'',userName:''})
    const [emailValidity, setEmailValidity] = useState<boolean>(false)
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [errorLine, setErrorLine] = useState<string>()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && emailValidity && confirmPassword === user.password){
            await register({email: user.email, password: user.password}).then(
                res => {
                    if (res.status === 201) {
                        console.log(res.data)
                        props.moveToLogin()
                    } else {
                        console.log(res)
                    }
                }
            ).catch((err  : AxiosError)=> { console.log(err); setErrorLine(err.response?.data as string)})
        } else {
            console.log("something not valid")
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
        <EmailTextField setEmail={(email : string) => setUser((user) => ({...user, email : email}))} setValidity={setEmailValidity}/>
        <TextField required fullWidth autoComplete="userName" label="User Name" value={user.userName}
         onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUser((user : User) => ({...user, userName : e.target.value}))}/>
        <TextField margin="normal" required fullWidth label="Password"
        type="password" autoComplete="current-password" value={user.password}
        onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUser((user : User) => ({...user, password : e.target.value}))} />
        <TextField error={confirmPassword !== user.password} margin="normal" required fullWidth label="Confirm Password"
        type="password" autoComplete="current-password" value={confirmPassword}
        onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setConfirmPassword(e.target.value)} />
        {errorLine && <Typography color='red' textAlign='center' fontWeight='bold'>{errorLine}</Typography>}
        <Button type="submit" fullWidth variant="contained"> SignUp </Button>
    </Box>)
}
export default SignUp;