import { Avatar, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../dtos/userDtos";
import { getUserProfilePicture } from "../utils/getUserProfilePicture";
import CountryInfoChip from "../components/CountryInfoChip";
import { AccountCircle, AlternateEmail, Edit, Password, Person } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import ProfileListItem from "../components/ProfileListItem";
import e from "express";
import store from "../redux/store";
import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/UserReducer";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
    const [myUser, setMyUser] = useState<User>()
    const user = useSelector((state: UserState) => state.user);
    const {updateUser} = useAuth();

    useEffect(() => setMyUser(user), [user])

    const saveUser = async (func : Function) => {
        myUser &&
        await updateUser(myUser).then(res => {
            if(res.status === 200){
                func();
            }
        })
    }
    return( 
        <>
        {myUser &&
        <Stack sx={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:10}}>
            <Avatar sx={{height:250, width:250}} src={getUserProfilePicture()} />
            <List>
                <ProfileListItem editable 
                                icon={<Person sx={{width:50, height:50}}/>}
                label='Username'
                text={myUser.userName}
                textFieldProps={{onChange: (e) => 
                    {setMyUser(user => user && ({...user, userName : e.target.value}))}
                }}
                onSave={saveUser}
                />
                <Divider  />
                <ProfileListItem 
                icon={<AlternateEmail sx={{width:50, height:50}}/>}
                label='Email'
                text={myUser.email}
                />
                <Divider />
                {!myUser.isGoogleLogin &&
               <ProfileListItem 
               icon={<Password sx={{width:50, height:50}}/>}
               label={<Button variant="contained">Change Password</Button>}
               text={undefined}
               />
}
            </List>
        {/* <Stack sx={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:10}}>
            <Avatar sx={{height:250, width:250}} src={getUserProfilePicture()} />
            {/* <Typography fontSize={30} fontWeight="bold">{myUser.userName}</Typography>
            <Typography>{myUser.email}</Typography>
            <Typography>{myUser.password}</Typography>
            <Typography>{myUser.userName}</Typography>
            <CountryInfoChip sx={{fontSize:30, width:'max-content'}} icon={<AccountCircle/>} label={myUser.userName}/>
        </Stack> */}
        </Stack>
    }
    </>
    )
}

export default MyProfile;