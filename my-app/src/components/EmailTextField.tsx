import { TextField } from "@mui/material"
import { useEffect, useState } from "react";

interface EmailTextFieldProps {
    setEmail : (email : string) => void,
    setValidity : (validity : boolean) => void
}

const EmailTextField = (props : EmailTextFieldProps) => {
    const [email, setEmail] = useState<string>('');
    const [emailValidity, setEmailValidity] = useState<boolean>(true)

    const handleEmailValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
        setEmailValidity(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    }

    useEffect(() => {
        props.setEmail(email)
        props.setValidity(emailValidity)
    }, [email, emailValidity])
    
    return (
        <TextField
                error={!emailValidity}
                margin="normal"
                required
                fullWidth
                label="Email"
                autoComplete="email"
                autoFocus
                helperText={!emailValidity ? 'Invalid email address' : ''}
                value={email}
                onChange={handleEmailValidity}
              />
    )
}

export default EmailTextField;