import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal, Box, Typography, Stack } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

interface AuthModalProps {
    open : boolean;
    onClose : () => void;
    setUserName : Dispatch<SetStateAction<string | undefined>>;
}

const AuthModal = (props : AuthModalProps) => {
  
  const [alreadyUser, setAlreadyUser] = useState<boolean>(true)

  return (
    <Modal open={props.open} onClose={props.onClose}>
        <Box
        sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '4px solid #1967d2',
            borderRadius: 5,
            padding: 4,
            
        }}
        >
        <Typography fontSize={25} textAlign={'center'}>
            {alreadyUser ? "Login" : "Sign Up"}
        </Typography>
        {alreadyUser ? <Login setUserName={props.setUserName} closeModal={props.onClose} moveToSignUp={() => setAlreadyUser(false)}/> : <SignUp moveToLogin={()=>setAlreadyUser(true)}/>}
        <Stack display='flex' useFlexGap sx={{flexDirection:'row', paddingTop: 2}}>
        <GoogleLogin
            onSuccess={res=> res.credential && console.log(jwtDecode(res.credential))}
            onError={() => {
                console.log('Login Failed');
            }}
            useOneTap
            />
            <Button fullWidth variant="contained" color="success" onClick={()=> setAlreadyUser(value => !value)}>{alreadyUser ? 'New User' : 'Already User'}</Button>
            </Stack>
        </Box>
    </Modal>
  );
};

export default AuthModal;
