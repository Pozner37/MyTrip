import { Edit, Person, Save } from "@mui/icons-material";
import { ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, TextField, TextFieldProps, ListItemTextProps, ListItemProps } from "@mui/material";
import { blue } from "@mui/material/colors";
import { PropsWithChildren, ReactNode, useState } from "react";

interface ProfileListItemProps extends PropsWithChildren<ListItemProps>{
    icon : ReactNode,
    listItemTextProps? : Omit<ListItemTextProps,'children'>
}

const ProfileListItem = (props : ProfileListItemProps) => {

    return (
        <ListItem {...props} sx={{width:'400px', ...props.sx}}>
            <ListItemAvatar>
                <Avatar sx={{width:70, height:70, backgroundColor:blue[400]}}>
                    {props.icon}
                </Avatar>
            </ListItemAvatar>
            <ListItemText {...props.listItemTextProps}>
                {props.children}
            </ListItemText>
        </ListItem>
    )
}

export default ProfileListItem;