import { Box, TextField, Button } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"
import EmailTextField from "./EmailTextField"
import { User } from "../dtos/userDtos"
import useAuth from "../hooks/useAuth"

interface SignUpModalProps {
    moveToLogin : () => void,
    setErrorLine : Dispatch<SetStateAction<string | undefined>>
}

const SignUp = (props : SignUpModalProps) => {
    const [user, setUser] = useState<User>({email:'',iconUrl:'',password:'',userName:''})
    const [emailValidity, setEmailValidity] = useState<boolean>(false)
    const [confirmPassword, setConfirmPassword] = useState<string>()

    const {register} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && emailValidity && confirmPassword === user.password) {
            props.setErrorLine(undefined)
            await register(user).then(
                res => {
                    if (res.status === 201) {
                        props.moveToLogin()
                    } 
                    else {
                        props.setErrorLine(res.data as string)
                    }
                }
            )
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
        <Button type="submit" fullWidth variant="contained"> SignUp </Button>
    </Box>)
}
export default SignUp;