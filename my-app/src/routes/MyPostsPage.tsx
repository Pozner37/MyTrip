import Post from "../components/Post";
import { getPostsByUser } from "../utils/postsUtils";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { PostType } from "../components";
import store from "../redux/store";

const MyPostsPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const userName = store.getState().userName;

  const fetchPosts = () => {
    if (userName) {
      getPostsByUser(userName).then((res) => {
        return setPosts(res.data);
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Stack spacing={2} alignItems="center" sx={{ padding: "4%" }}>
        {(posts.length &&
          posts.map((post) => (
            <Post key={post._id} post={post} fetchPostsFunc={fetchPosts} />
          ))) ||
          `You don't have any posts`}
      </Stack>
    </>
  );
};

export default MyPostsPage;
