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
  TextField,
  Typography,
} from "@mui/material";
import { CommentType, PostType } from ".";
import {
  addCommentToPost,
  deletePost,
  getCommentsByPost,
  getPostCommentAmount,
  getPostImage,
  updatePost,
} from "../utils/postsUtils";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ForumIcon from "@mui/icons-material/Forum";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import store from "../redux/store";

interface PostProps {
  post: PostType;
  fetchPostsFunc: () => void;
}

const Post = ({ post, fetchPostsFunc }: PostProps) => {
  const [showComment, setShowComment] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [commentInput, setCommentInput] = useState<string>("");
  const [comments, setComments] = useState<Array<CommentType>>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(post.description);
  const [images, setImages] = useState([]);
  const userName = store.getState().userName;
  const isPostOwner = post.userName === userName;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
  };

  const handleExpandClick = (
    state: boolean,
    setState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setState(!state);
  };

  const fetchComments = () => {
    getPostCommentAmount(post._id).then((res) => {
      return setCommentCount(res.data);
    });

    getCommentsByPost(post._id).then((res) => {
      return setComments(res.data);
    });
  };

  useEffect(() => {
    fetchComments();
  }, []);

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
        {edit ? (
          <>
            <ReactImageUploading
              value={images}
              onChange={onChange}
              maxNumber={1}
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className="upload__image-wrapper">
                  <Button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {isDragging ? "Drop photo here" : "Upload post photo"}
                  </Button>
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.dataURL} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <Button onClick={() => onImageUpdate(index)}>
                          Select new photo
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ReactImageUploading>
            <TextField
              defaultValue={post.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
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
          {userName && (
            <>
              <Button
                size="small"
                endIcon={<AddCommentIcon />}
                onClick={() => handleExpandClick(addComment, setAddComment)}
              >
                Add Comment
              </Button>
              {!isPostOwner && (
                <Button size="small" endIcon={<ForumIcon />}>
                  Chat
                </Button>
              )}
            </>
          )}
          {isPostOwner && !edit && (
            <>
              <Button
                size="small"
                endIcon={<EditIcon />}
                onClick={() => setEdit(true)}
              >
                Edit
              </Button>
              <Button
                size="small"
                endIcon={<DeleteIcon />}
                onClick={() => {
                  deletePost(post._id).then(fetchPostsFunc);
                }}
              >
                Delete Post
              </Button>
            </>
          )}
          {edit && (
            <>
              <Button
                size="small"
                endIcon={<SaveIcon />}
                onClick={() => {
                  updatePost({
                    ...post,
                    description,
                    postId: post._id,
                  });
                  setEdit(false);
                }}
              >
                Save
              </Button>
              <Button
                size="small"
                endIcon={<CancelIcon />}
                onClick={() => {
                  setDescription(post.description);
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
            </>
          )}
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
          {userName && (
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
                          userName &&
                          addCommentToPost({
                            commentContent: commentInput,
                            postId: post._id,
                            user: userName,
                          }).then(fetchComments);
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
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
