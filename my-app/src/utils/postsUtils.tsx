import axios from "axios";
import { CommentType, EditPostType, PostType } from "../components";

export interface ApiResponse {
  data: PostType[];
  status: number;
}

const path = process.env.REACT_APP_SERVER_PATH;

export const getPostsByCountry = async (
  countryName: string
): Promise<ApiResponse | any> =>
  axios
    .get<ApiResponse>(`${path}/posts/byCountry/${countryName}`)
    .catch(function (error) {
      console.error(error);
    });

    export const getPostsByUser = async (
      userName: string
    ): Promise<ApiResponse | any> =>
      axios
        .get<ApiResponse>(`${path}/posts/byUserName/${userName}`)
        .catch(function (error) {
          console.error(error);
        });

export const getPostCommentAmount = async (
  postId: string
): Promise<ApiResponse | any> =>
  axios
    .get<ApiResponse>(
      `${path}/comments/commentsCounter/${postId}`
    )
    .catch(function (error) {
      console.error(error);
    });

export const getCommentsByPost = async (
  postId: string
): Promise<ApiResponse | any> =>
  axios
    .get<ApiResponse>(
      `${path}/comments/getCommentsByPost/${postId}`
    )
    .catch(function (error) {
      console.error(error);
    });

export const addCommentToPost = (comment: Omit<CommentType, "_id">) =>
  axios
    .post(`${path}/comments/postComment`, comment)
    .catch(function (error) {
      console.error(error);
    });

export const addPost = (post: Omit<PostType, "_id">) =>
  axios.post(`${path}/posts/`, post).catch(function (error) {
    console.error(error);
  });

export const updatePost = (post: EditPostType) =>
  axios.put(`${path}/posts/`, post).catch(function (error) {
    console.error(error);
  });

  export const deletePost = (postId: string) =>
  axios.delete(`${path}/posts/${postId}`, {
    params: { postId }
  }).catch(function (error) {
    console.error(error);
  });
