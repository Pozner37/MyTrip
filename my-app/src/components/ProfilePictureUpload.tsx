import { Delete, Edit } from "@mui/icons-material"
import { AvatarGroup, Avatar, IconButton, Badge } from "@mui/material"
import { blue } from "@mui/material/colors"
import { ReactNode } from "react";
import ImageUploading from "react-images-uploading";

interface ProfilePictureUploadProps {
    image : string,
    setImage : (image : string) => void
    defaultImage : string
    extraAvatars? : ReactNode
}

const ProfilePictureUpload = (props : ProfilePictureUploadProps) => {
   return (
    <ImageUploading
    value={[{dataURL : props.image}]}
    onChange={(newImage) => {newImage[0] ? newImage[0].dataURL && props.setImage(newImage[0].dataURL) : props.setImage(props.defaultImage)}}
    maxNumber={1}
  >
    {({
      imageList,
      onImageUpdate,
      onImageRemove,
      dragProps,
    }) => (
      <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
          <AvatarGroup>
             {props.defaultImage !== props.image && <><Avatar>
          <IconButton sx={{ backgroundColor:blue[500], color:'white'}} onClick={()=>{onImageRemove(0)}}>
            <Delete />
          </IconButton>
          </Avatar>
          {props.extraAvatars}
          </>}
              <Avatar>
          <IconButton sx={{ backgroundColor:blue[500], color:'white'}} onClick={() => onImageUpdate(0)}>
            <Edit />
          </IconButton>
          </Avatar>
          </AvatarGroup>
        }>
  <Avatar sx={{height:250, width:250}} src={imageList[0].dataURL}/>
 </Badge>
    )}
  </ImageUploading>
   )
}

export default ProfilePictureUpload