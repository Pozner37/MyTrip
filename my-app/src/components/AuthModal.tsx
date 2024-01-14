import { useState } from 'react';
import { Button, Modal, Box, Typography, Stack } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import { UserState, setShowAuthModal, setUser } from '../redux/reducers/UserReducer';
import { googleLogin } from '../utils/authUtils';

const AuthModal = () => {
  const appProps = useSelector((state: UserState) => state);
  const [errorLine, setErrorLine] = useState<string>()
  const [alreadyUser, setAlreadyUser] = useState<boolean>(true)
  const dispatch = useDispatch();

  const onClose = () => dispatch(setShowAuthModal(false))

  const handleGoogleLogin = async (res : CredentialResponse) => {
    if(res.credential)
    {
        console.log(jwtDecode(res.credential))
        await googleLogin(res.credential).then(res => {
            if (res.status === 200) {
                onClose();
                dispatch(setUser(res.data))
            }
        })
    }
  }

  return (
    <Modal open={appProps.showAuthModal} onClose={onClose}>
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
        {alreadyUser ? <Login closeModal={onClose} moveToSignUp={() => setAlreadyUser(false)} setErrorLine={setErrorLine}/>
         : <SignUp moveToLogin={()=>setAlreadyUser(true)} setErrorLine={setErrorLine}/>}
        <Stack display='flex' useFlexGap sx={{flexDirection:'row', paddingTop: 2}}>
        <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
                console.log('Login Failed');
            }}
            useOneTap
            />
            <Button fullWidth variant="contained" color="success" onClick={()=> setAlreadyUser(value => !value)}>{alreadyUser ? 'New User' : 'Already User'}</Button>
            </Stack>
            {errorLine && <Typography color='red' textAlign='center' fontWeight='bold'>{errorLine}</Typography>} 
        </Box>
    </Modal>
  );
};

export default AuthModal;
