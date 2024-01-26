import axios, { AxiosResponse } from "axios";
import { BasicUserDto, ChangePasswordDto } from "../dtos/userDtos";

const path = process.env.REACT_APP_SERVER_PATH;

export const getUserRequest = async () => 
    await axios.get<{}, AxiosResponse<BasicUserDto>>(`${path}/user`, { withCredentials : true});

export const updateUserNameRequest = async (userName : string) => 
    await axios.post<{userName : string}, AxiosResponse<BasicUserDto>>(`${path}/user/userName`, {userName : userName} , { withCredentials : true});

export const updatePasswordRequest = async (passwords : ChangePasswordDto) => 
    await axios.post<ChangePasswordDto, AxiosResponse<BasicUserDto>>(`${path}/user/password`, passwords, { withCredentials : true});

export const updateProfilePictureRequest = async (image : string) => 
    await axios.post<{image : string}, AxiosResponse<BasicUserDto>>(`${path}/user/profileImage`, {image : image}, { withCredentials : true});