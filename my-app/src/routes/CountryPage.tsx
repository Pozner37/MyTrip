import { useParams } from "react-router-dom";
import CountryCard from "../components/CountryCard";
import Post from "../components/Post";
import { getPostsByCountry } from "../utils/postsUtils";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { PostType } from "../components";

const CountryPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { name } = useParams();

  useEffect(()=> {
    if(name){
        getPostsByCountry(name).then( res => {
          return setPosts(res.data)});
      }
  },[]);

  return (
    <>
      <CountryCard name={name} />
      <Stack spacing={2} alignItems="center" sx={{padding: '4%'}}>
        {posts.length && posts.map((post) => <Post key={post._id} post={post}/>)}
      </Stack>
    </>
  );
};

export default CountryPage;
