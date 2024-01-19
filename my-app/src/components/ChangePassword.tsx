import { Box, Button, TextField } from "@mui/material";
import { ChangePasswordDto, User } from "../dtos/userDtos";
import { setUser } from "../redux/reducers/UserReducer";
import { useState } from "react";

interface ChangePasswordProps {
    onSubmit : (passwords : ChangePasswordDto) => void
}

const ChangePassword = (props : ChangePasswordProps) => {
    const [oldPassword, setOldPassword] = useState<string>()
    const [newPassword, setNewPassword] = useState<string>()
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (oldPassword && newPassword && confirmNewPassword === newPassword) {
            props.onSubmit({
                oldPassword : oldPassword,
                newPassword : newPassword
            })
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit}>
        <TextField margin="normal" required label="Old Password"
        type="password" autoComplete="current-password" value={oldPassword}
        onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setOldPassword(e.target.value)} />
       <TextField margin="normal" required label="New Password"
        type="password" autoComplete="current-password" value={newPassword}
        onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewPassword(e.target.value)} />
        <TextField error={confirmNewPassword !== newPassword} margin="normal" required label="Confirm New Password"
        type="password" autoComplete="current-password" value={confirmNewPassword}
        onChange={(e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setConfirmNewPassword(e.target.value)} />
        <Button type="submit" fullWidth variant="contained"> Submit </Button>
        </Box>
    )
}

export default ChangePassword;