import axios from "axios";
import { CommentType, EditPostType, PostType } from "../components";

interface ApiResponse {
  data: PostType[];
  status: number;
}

export const getPostsByCountry = async (
  countryName: string
): Promise<ApiResponse | any> =>
  axios
    .get<ApiResponse>(`http://localhost:3000/posts/byCountry/${countryName}`)
    .catch(function (error) {
      console.error(error);
    });

    export const getPostsByUser = async (
      userName: string
    ): Promise<ApiResponse | any> =>
      axios
        .get<ApiResponse>(`http://localhost:3000/posts/byUserName/${userName}`)
        .catch(function (error) {
          console.error(error);
        });

export const getPostImage = (postId: string) => {
  // TODO: implement when api is ready
  return "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/All_Destinations/AFME/Africa_-_Middle_East/Tel%20Aviv%20Guide%202023_HERO/Tel-Aviv-Travel-Guide-What%27s-New-in-Israel%27s-Capit.jpg?tr=w-1008%2Ch-567%2Cfo-auto";
};

export const getPostCommentAmount = async (
  postId: string
): Promise<ApiResponse | any> =>
  axios
    .get<ApiResponse>(
      `http://localhost:3000/comments/commentsCounter/${postId}`
    )
    .catch(function (error) {
      console.error(error);
    });

export const getCommentsByPost = async (
  postId: string
): Promise<ApiResponse | any> =>
  axios
    .get<ApiResponse>(
      `http://localhost:3000/comments/getCommentsByPost/${postId}`
    )
    .catch(function (error) {
      console.error(error);
    });

export const addCommentToPost = (comment: Omit<CommentType, "_id">) =>
  axios
    .post("http://localhost:3000/comments/postComment", comment)
    .catch(function (error) {
      console.error(error);
    });

export const addPost = (post: Omit<PostType, "_id">) =>
  axios.post("http://localhost:3000/posts/", post).catch(function (error) {
    console.error(error);
  });

export const updatePost = (post: EditPostType) =>
  axios.put("http://localhost:3000/posts/", post).catch(function (error) {
    console.error(error);
  });

  export const deletePost = (postId: string) =>
  axios.delete(`http://localhost:3000/posts/${postId}`, {
    params: { postId }
  }).catch(function (error) {
    console.error(error);
  });
