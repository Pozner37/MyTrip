import { Avatar, Card, CardContent, IconButton, Typography } from "@mui/material";
import { BasicUserDto } from "../dtos/userDtos";
import { CardStyle } from "./CountryCard";
import { getUserProfilePicture } from "../utils/getUserProfilePicture";
import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/UserReducer";
import { Edit } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router";

const UserCard = (basicUser : BasicUserDto) => {
    const myUser = useSelector((state: UserState) => state.user);
    const isMyUser = basicUser.userName === myUser?.userName;
    const navigate = useNavigate();

    return (
        <Card variant="outlined" sx={CardStyle}>
            <Avatar sx={{height:250, width:250}} src={getUserProfilePicture()} />
            <CardContent>
            <Typography fontSize={30} fontWeight="bold" textAlign="center">
                {basicUser.userName}
            </Typography>
            </CardContent>
            {isMyUser && <IconButton sx={{float:'right', backgroundColor:blue[500], color:'white'}} onClick={() => navigate('/myProfile')}>
                <Edit/>
            </IconButton>}
        </Card>
    )
}

export default UserCard;
