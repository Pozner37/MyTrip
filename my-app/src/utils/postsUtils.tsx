import axios from "axios";
import { CommentType, EditPostType, PostType } from "../components";
import axiosAuthInstance from "./axiosUtils";

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

export const addCommentToPost = (comment: Omit<CommentType, "_id" | "userName">) =>
  axiosAuthInstance
    .post(`${path}/comments/postComment`, comment, {withCredentials : true})
    .catch(function (error) {
      console.error(error);
    });

export const addPost = (post: Omit<PostType, "postId">) =>
axiosAuthInstance.post(`${path}/posts/`, post, {withCredentials : true}).catch(function (error) {
    console.error(error);
  });

export const updatePost = (post: EditPostType) =>
axiosAuthInstance.put(`${path}/posts/`, post, {withCredentials : true}).catch(function (error) {
    console.error(error);
  });

  export const deletePost = (postId: string) =>
  axiosAuthInstance.delete(`${path}/posts/${postId}`, {
    params: { postId },
    withCredentials : true
  }).catch(function (error) {
    console.error(error);
  });
