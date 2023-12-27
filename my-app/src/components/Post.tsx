import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { CommentType, PostType } from ".";
import {
  addCommentToPost,
  getCommentsByPost,
  getPostCommentAmount,
  getPostImage,
} from "../utils/postsUtils";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ForumIcon from "@mui/icons-material/Forum";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import SendIcon from "@mui/icons-material/Send";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  const [showComment, setShowComment] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [commentInput, setCommentInput] = useState<string>("");
  const [comments, setComments] = useState<Array<CommentType>>([]);

  const handleExpandClick = (
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState(!state);
  };

  useEffect(() => {
    getPostCommentAmount(post._id).then((res) => {
      return setCommentCount(res.data);
    });

    getCommentsByPost(post._id).then((res) => {
      return setComments(res.data);
    });
  }, [addComment]);

  return (
    <Card sx={{ width: "50%" }}>
      <CardMedia
        sx={{ height: "20em" }}
        image={getPostImage(post._id)}
        title="Post"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ float: "right" }}>
        <Stack spacing={1} direction="row">
          <Button
            size="small"
            endIcon={<CommentIcon />}
            onClick={() => handleExpandClick(showComment, setShowComment)}
          >
            Show {commentCount} Comments
          </Button>
          <Button
            size="small"
            endIcon={<AddCommentIcon />}
            onClick={() => handleExpandClick(addComment, setAddComment)}
          >
            Add Comment
          </Button>
          <Button size="small" endIcon={<ForumIcon />}>
            Chat
          </Button>
        </Stack>
      </CardActions>
      <Collapse in={showComment} timeout="auto" unmountOnExit>
        <CardContent>
          {comments?.map((comment) => (
            <Comment comment={comment} />
          ))}
        </CardContent>
      </Collapse>
      <Collapse in={addComment} timeout="auto" unmountOnExit>
        <CardContent>
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel htmlFor="comment-text">Add a comment</InputLabel>
            <OutlinedInput
              id="comment-text"
              label="add a comment"
              fullWidth
              color="info"
              onChange={(e) => setCommentInput(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      commentInput &&
                        addCommentToPost({
                          commentContent: commentInput,
                          postId: post._id,
                          user: post.userName,
                        });
                      handleExpandClick(addComment, setAddComment);
                    }}
                    edge="end"
                  >
                    <SendIcon color="info" />
                  </IconButton>
                </InputAdornment>
              }
            ></OutlinedInput>
          </FormControl>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
