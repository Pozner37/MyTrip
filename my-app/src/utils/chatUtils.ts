import axios from "axios";
import { ApiResponse } from "./postsUtils";

export const getChatFromDB = async (
    users :{
        firstUser: string,
        secondUser: string
    }
  ): Promise<ApiResponse | any> =>
    axios
      .post<ApiResponse>(
        `${process.env.REACT_APP_SERVER_PATH}/messages/getChat`, users
      )
      .catch(function (error) {
        console.error(error);
      });