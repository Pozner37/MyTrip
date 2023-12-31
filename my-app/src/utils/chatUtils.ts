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
        `http://localhost:5000/messages/getChat`, users
      )
      .catch(function (error) {
        console.error(error);
      });