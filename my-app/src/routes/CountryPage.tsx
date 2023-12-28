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
    name && addPost({
      description,
      country: name,
      userName: '658768583bd6bbd56b8abe85' // TODO: implement when users are ready
    }).then(fetchPosts);
  };

  return (
    <>
      <CountryCard name={name} />
      <Stack spacing={2} alignItems="center" sx={{ padding: "4%" }}>
        {posts.length &&
          posts.map((post) => <Post key={post._id} post={post} />)}
      </Stack>
      <Tooltip title="Add new post">
      <Fab
        color="primary"
        sx={{ position: "fixed", left: "1%", top: "92%" }}
        onClick={() => setOpenModal(true)}
      >
        <AddIcon />
      </Fab>
      </Tooltip>
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
