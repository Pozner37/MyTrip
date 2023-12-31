import { Dispatch, SetStateAction, useState } from 'react';
import { Button, Modal, Box, Typography, Stack } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux';
import { UserState, setShowAuthModal } from '../redux/reducers/UserReducer';

const AuthModal = () => {
  const appProps = useSelector((state: UserState) => state);

  const [alreadyUser, setAlreadyUser] = useState<boolean>(true)
  const dispatch = useDispatch();

  const onClose = () => dispatch(setShowAuthModal(false))

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
        {alreadyUser ? <Login closeModal={onClose} moveToSignUp={() => setAlreadyUser(false)}/> : <SignUp moveToLogin={()=>setAlreadyUser(true)}/>}
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
