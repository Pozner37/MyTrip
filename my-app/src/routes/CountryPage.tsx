import { useParams } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import Post from "../components/Post";
import { addPost, getPostsByCountry } from "../utils/postsUtils";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PostType } from "../components";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/UserReducer";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CountryPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const { name } = useParams();
  const [images, setImages] = useState([]);
  const user = useSelector((state: UserState) => state.user);

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
  };

  const fetchPosts = () => {
    if (name) {
      getPostsByCountry(name).then((res) => {
        return setPosts(res.data);
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addNewPost = () => {
    name &&
      user &&
      addPost({
        description,
        country: name,
        userName: user.userName,
      }).then(fetchPosts);
  };

  return (
    <>
      <CountryCard name={name} />
      <Stack spacing={2} alignItems="center" sx={{ padding: "4%" }}>
        {(posts.length &&
          posts.map((post) => (
            <Post key={post._id} post={post} fetchPostsFunc={fetchPosts} />
          ))) ||
          "This country has no posts"}
      </Stack>
      {user && (
        <Tooltip title="Add new post">
          <Fab
            color="primary"
            sx={{ position: "fixed", left: "1%", top: "92%" }}
            onClick={() => setOpenModal(true)}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      )}
      <Modal open={openModal}>
        <Box sx={modalStyle}>
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              Share a post from {name}:
            </Typography>
            <TextField
              required
              label="Description"
              multiline
              maxRows={4}
              onChange={(e) => setDescription(e.target.value)}
            />
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
                        <Button onClick={() => onImageRemove(index)}>
                          Remove photo
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ReactImageUploading>
          </Stack>
          <Button
            onClick={() => {
              addNewPost();
              setOpenModal(false);
            }}
          >
            Save
          </Button>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        </Box>
      </Modal>
    </>
  );
};

export default CountryPage;
