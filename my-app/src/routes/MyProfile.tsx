import { Avatar, Button, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../dtos/userDtos";
import { getUserProfilePicture } from "../utils/getUserProfilePicture";
import CountryInfoChip from "../components/CountryInfoChip";
import { AccountCircle, AlternateEmail, Edit, Password, Person, Save } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import ProfileListItem from "../components/ProfileListItem";
import e from "express";
import store from "../redux/store";
import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/UserReducer";
import useAuth from "../hooks/useAuth";
import { fontSize } from "@mui/system";
import ChangePassword from "../components/ChangePassword";

type editProfileProperties = 'UserName' | 'Picture' | 'Password'

const MyProfile = () => {
    const [myUser, setMyUser] = useState<User>()
    const [editedProperty, setEditedProperty] = useState<editProfileProperties | undefined>(undefined)
    const user = useSelector((state: UserState) => state.user);
    const {updateUser} = useAuth();

    useEffect(() => setMyUser(user), [user])

    const saveUser = async () => {
        if(myUser) {
        return await updateUser(myUser).then(res => {
            if(res.status === 200){
                setEditedProperty(undefined)
            }
            return res;
        }).catch((err: any) => err.response)
    }
    }

    const saveNewPassword = async (password : string) => {
        debugger
        if(myUser){
        setMyUser({...myUser, password: password})
        await saveUser().then(res => {
            if(res.status === 200) setEditedProperty(undefined)
        })
        }
    }

    return( 
        <>
        {myUser &&
        <Stack sx={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:10}}>
            <Avatar sx={{height:250, width:250}} src={getUserProfilePicture()} />
            <List>
                <ProfileListItem icon={<Person sx={{width:50, height:50}}/>}
                listItemTextProps={ editedProperty === 'UserName' ? {} :
                    {sx:{marginLeft:3}, primary:'UserName', secondary:myUser.userName, primaryTypographyProps:{fontSize:20}, secondaryTypographyProps:{fontSize:20}}
                }
                secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => {
                        editedProperty === 'UserName' ? saveUser()
                         :  setEditedProperty('UserName');
                        }}>
                      {editedProperty === 'UserName' ? <Save/> : <Edit />}
                    </IconButton>
                }
                >
                    { editedProperty === 'UserName' &&
                <TextField sx={{marginLeft:3}} variant="outlined" label={'UserName'} value={myUser.userName}
                 onChange={(e) => setMyUser(user => user && ({...user, userName : e.target.value}))}/>}
                </ProfileListItem>
                <Divider  />
                <ProfileListItem icon={<AlternateEmail sx={{width:50, height:50}} />}
                listItemTextProps={{sx:{marginLeft:3},primaryTypographyProps:{fontSize:20}, secondaryTypographyProps:{fontSize:20}, primary:'Email', secondary:myUser.email}}
                />
                <Divider />
                {!myUser.isGoogleLogin &&
               <ProfileListItem icon={<Password sx={{width:50, height:50}}/>}
               listItemTextProps={{sx:{textAlign:'center'}}}>
                { editedProperty === 'Password' ? 
                <ChangePassword onSubmit={saveNewPassword}/>
                :
                <Button variant="contained" onClick={() => setEditedProperty('Password')}>Change Password</Button>
                }
                </ProfileListItem>
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