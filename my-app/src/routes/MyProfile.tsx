import { Avatar, Button, Divider, IconButton, List, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { BasicUserDto } from "../dtos/userDtos";
import { getUserProfilePicture } from "../utils/getUserProfilePicture";
import { AlternateEmail, Edit, Password, Person, Save } from "@mui/icons-material";
import ProfileListItem from "../components/ProfileListItem";
import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/UserReducer";
import ChangePassword from "../components/ChangePassword";
import useUpdateUser from "../hooks/useUpdateUser";
import { AxiosResponse } from "axios";
import { blue } from "@mui/material/colors";
import ProfilePictureUpload from "../components/ProfilePictureUpload";

type editProfileProperties = 'UserName' | 'Picture' | 'Password'

const MyProfile = () => {
    const [myUser, setMyUser] = useState<BasicUserDto>()
    const [image, setImage] = useState(getUserProfilePicture())
    const [editedProperty, setEditedProperty] = useState<editProfileProperties | undefined>(undefined)
    const user = useSelector((state: UserState) => state.user);
    const { updateUserName, updatePassword, updateProfileImage} = useUpdateUser();

    const saveUserFuncRecord : Record<editProfileProperties, (any) => Promise<AxiosResponse<BasicUserDto | string>>> = {
        Password : updatePassword,
        UserName : updateUserName,
        Picture : updateProfileImage
    }

    useEffect(() => {
        setEditedProperty(image === myUser?.userName ? undefined : 'Picture')
    }, [image])

    useEffect(() => {
        if(user){
        setMyUser(user);
        setImage(user.image)
        }
    }, [user])

    const saveUser = async (props : any) => {
        if(myUser && editedProperty) {
        return await saveUserFuncRecord[editedProperty](props).then(res => {
            if(res.status === 200){
                setEditedProperty(undefined)
            }
            return res;
        }).catch((err: any) => err.response)
    }
    }

    return( 
        <>
        {myUser &&
        <Stack sx={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:10}}>
            <ProfilePictureUpload image={image} setImage={setImage} defaultImage={myUser.image} extraAvatars={
              <Avatar>
           <IconButton sx={{ backgroundColor:blue[500], color:'white'}} onClick={()=>saveUser(image)}>
            <Save />
          </IconButton>
          </Avatar>
            }
              />
            <List>
                <ProfileListItem icon={<Person sx={{width:50, height:50}}/>}
                listItemTextProps={ editedProperty === 'UserName' ? {} :
                    {sx:{marginLeft:3}, primary:'UserName', secondary:myUser.userName, primaryTypographyProps:{fontSize:20}, secondaryTypographyProps:{fontSize:20}}
                }
                secondaryAction={
                    <IconButton edge="end" sx={{ backgroundColor:blue[500], color:'white'}} onClick={() => {
                        editedProperty === 'UserName' ? saveUser(myUser.userName)
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
                <ChangePassword onSubmit={saveUser}/>
                :
                <Button variant="contained" onClick={() => setEditedProperty('Password')}>Change Password</Button>
                }
                </ProfileListItem>
}
            </List>
        </Stack>
    }
    </>
    )
}

export default MyProfile;