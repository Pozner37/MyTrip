import { Edit, Person, Save } from "@mui/icons-material";
import { ListItem, IconButton, ListItemAvatar, Avatar, ListItemText, TextField, TextFieldProps } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ReactNode, useState } from "react";

interface ProfileListItemProps {
    icon : ReactNode,
    label : ReactNode,
    text : ReactNode,
    textFieldProps? : TextFieldProps,
    onSave? : (closeTextBox : Function) => void,
    editable? : boolean
}

const ProfileListItem = (props : ProfileListItemProps) => {

const [edit, setEdit] = useState<boolean>(false);
    return (
        <ListItem sx={{width:'400px'}}
                secondaryAction={ props.editable &&
                    <IconButton edge="end" aria-label="delete" onClick={() => {
                        edit ?
                         (props.onSave && props.onSave(() => setEdit(false)))
                         :  setEdit(true);
                        }}>
                      {edit ? <Save/> : <Edit />}
                    </IconButton>
                  }>
                    <ListItemAvatar>
                    <Avatar sx={{width:70, height:70, backgroundColor:blue[400]}}>
                        {props.icon}
                    </Avatar>
                    </ListItemAvatar>
                    { edit ? <TextField sx={{marginLeft:3}} variant="outlined" label={props.label} value={props.text} {...props.textFieldProps}/> :
                    <ListItemText sx={{marginLeft:3}} primaryTypographyProps={{fontSize:20}} secondaryTypographyProps={{fontSize:20}} primary={props.label} secondary={props.text} />
}
                </ListItem>
    )
}

export default ProfileListItem;