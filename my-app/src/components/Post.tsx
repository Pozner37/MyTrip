import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { PostType } from ".";
import { getPostCommentAmount, getPostImage } from "../utils/postsUtils";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ForumIcon from "@mui/icons-material/Forum";
import CommentIcon from '@mui/icons-material/Comment';

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <Card sx={{ width: "50%" }}>
      <CardMedia
        sx={{ height: "20em" }}
        image={getPostImage(post.id)}
        title="Post"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions sx={{float: 'right'}}>
        <Stack spacing={1} direction="row">
        <Typography>{getPostCommentAmount(post.id)}</Typography>
        <CommentIcon/>
        <Button size="small" endIcon={<AddCommentIcon />}>
          Comment
        </Button>
        <Button size="small" endIcon={<ForumIcon />}>
          Chat
        </Button>
        </Stack>
        
      </CardActions>
    </Card>
  );
};

export default Post;
