import Post from "../components/Post";
import { getPostsByUser } from "../utils/postsUtils";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { PostType } from "../components";
import { useSelector } from "react-redux";
import { UserState } from "../redux/reducers/UserReducer";
import ProfileCard from "../components/UserCard";
import UserCard from "../components/UserCard";
import { BasicUserDto } from "../dtos/userDtos";
import { useParams } from "react-router-dom";

const UserPostPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const {userName} = useParams();

  const fetchPosts = () => {
    if (userName) {
      getPostsByUser(userName).then((res) => {
        return setPosts(res.data);
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userName]);

  return (
    <>
      {userName && <UserCard userName={userName}/>}
      <Stack spacing={2} alignItems="center" sx={{ padding: "4%" }}>
        {(posts.length &&
          posts.map((post) => (
            <Post key={post.postId} post={post} fetchPostsFunc={fetchPosts} />
          ))) ||
          `You don't have any posts`}
      </Stack>
    </>
  );
};

export default UserPostPage;
