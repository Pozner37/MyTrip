import { useParams } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import Post from "../components/Post";
import { getPostsByCountry } from "../utils/postsUtils";
import { Stack } from "@mui/material";

const CountryPage = () => {
  const { name } = useParams();

  const posts = name && getPostsByCountry(name);
  return (
    <>
      <CountryCard name={name} />
      <Stack spacing={2} alignItems="center" sx={{padding: '4%'}}>
        {posts && posts.map((post) => <Post post={post}/>)}
      </Stack>
    </>
  );
};

export default CountryPage;
