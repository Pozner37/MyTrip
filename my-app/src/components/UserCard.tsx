import { Avatar, Card, CardContent, IconButton, Typography } from "@mui/material";
import { CardStyle } from "./CountryCard";
import ForumIcon from "@mui/icons-material/Forum";
import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/UserReducer";
import { Edit } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getProfilePictureRequest } from "../utils/userUtils";

interface UserCardProps {
    userName : string
}

const UserCard = ({userName} : UserCardProps) => {
    const myUserName = useSelector((state: UserState) => state.user?.userName);
    const [userImage, setUserImage] = useState<string>();
    const isMyUser = userName === myUserName;
    const navigate = useNavigate();

    useEffect(() => {
        const attachProfileImage = async () => {
            setUserImage(await getProfilePictureRequest(userName).then(res => res.data))
        }
        attachProfileImage()
    }, [userName])

    return (
        <Card variant="outlined" sx={CardStyle}>
            <Avatar sx={{height:250, width:250}} src={userImage} />
            <CardContent>
            <Typography fontSize={30} fontWeight="bold" textAlign="center">
                {userName}
            </Typography>
            </CardContent>
            <IconButton sx={{float:'right', backgroundColor:blue[500], color:'white'}} onClick={() => isMyUser ? navigate('/myProfile') : navigate("/chat", { state: { toUser: userName } })}>
              {isMyUser ? <Edit/> : <ForumIcon/> }
            </IconButton>
        </Card>
    )
}

export default UserCard;
