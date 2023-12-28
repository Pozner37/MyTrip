import { useParams } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import Post from "../components/Post";
import { getPostsByCountry } from "../utils/postsUtils";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { PostType } from "../components";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const CountryPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { name } = useParams();

  useEffect(() => {
    if (name) {
      getPostsByCountry(name).then((res) => {
        return setPosts(res.data);
      });
    }
  }, []);

  const addPost() => {
    
  }

  return (
    <>
      <CountryCard name={name} />
      <Stack spacing={2} alignItems="center" sx={{ padding: "4%" }}>
        {posts.length &&
          posts.map((post) => <Post key={post._id} post={post} />)}
      </Stack>
      <Fab color="primary" sx={{position: 'absolute', left: '1%', top: '92%'}} onClick={addPost()}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default CountryPage;
