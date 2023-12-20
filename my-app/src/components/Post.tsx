import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { PostType } from ".";
import { getPostImage } from "../utils/postsUtils";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={getPostImage(post.id)}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Post;
