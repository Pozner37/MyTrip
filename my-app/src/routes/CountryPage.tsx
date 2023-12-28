import { useParams } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import Post from "../components/Post";
import { getPostsByCountry } from "../utils/postsUtils";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
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
  const [openModal, setOpenModal] = useState(false);
  const { name } = useParams();

  useEffect(() => {
    if (name) {
      getPostsByCountry(name).then((res) => {
        return setPosts(res.data);
      });
    }
  }, []);

  const addPost = () => {};

  return (
    <>
      <CountryCard name={name} />
      <Stack spacing={2} alignItems="center" sx={{ padding: "4%" }}>
        {posts.length &&
          posts.map((post) => <Post key={post._id} post={post} />)}
      </Stack>
      <Fab
        color="primary"
        sx={{ position: "absolute", left: "1%", top: "92%" }}
        onClick={() => setOpenModal(true)}
      >
        <AddIcon />
      </Fab>
      <Modal open={openModal}>
        <Box sx={modalStyle}>
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              Share a post from {name}:
            </Typography>
            <TextField required id="outlined-required" label="Description" />
          </Stack>
          <Button
            onClick={() => {
              addPost();
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
