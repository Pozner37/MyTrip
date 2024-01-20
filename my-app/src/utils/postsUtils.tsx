import axios from "axios";
import { CommentType, EditPostType, PostType } from "../components";

export interface ApiResponse {
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
