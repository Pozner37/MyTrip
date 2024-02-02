import { AxiosResponse } from "axios";
import { BasicUserDto, ChangePasswordDto } from "../dtos/userDtos";
import axiosAuthInstance from "./axiosUtils";

const path = process.env.REACT_APP_SERVER_PATH;

export const getUserRequest = async () => 
    await axiosAuthInstance.get<{}, AxiosResponse<BasicUserDto>>(`${path}/user`, { withCredentials : true});

export const updateUserNameRequest = async (userName : string) => 
    await axiosAuthInstance.post<{userName : string}, AxiosResponse<BasicUserDto>>(`${path}/user/userName`, {userName : userName} , { withCredentials : true});

export const updatePasswordRequest = async (passwords : ChangePasswordDto) => 
    await axiosAuthInstance.post<ChangePasswordDto, AxiosResponse<BasicUserDto>>(`${path}/user/password`, passwords, { withCredentials : true});

export const updateProfilePictureRequest = async (image : string) => 
    await axiosAuthInstance.post<{image : string}, AxiosResponse<BasicUserDto>>(`${path}/user/profileImage`, {image : image}, { withCredentials : true});