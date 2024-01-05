import Post from "../components/Post";
import { getPostsByUser } from "../utils/postsUtils";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { PostType } from "../components";
import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/UserReducer";

const MyPostsPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const user = useSelector((state: UserState) => state.user)

  const fetchPosts = () => {
    if (user) {
      getPostsByUser(user.userName).then((res) => {
        return setPosts(res.data);
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

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
