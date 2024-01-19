import axios, { AxiosResponse } from "axios";
import { BasicUserDto, ChangePasswordDto, User } from "../dtos/userDtos";
import { path } from "./authUtils";

export const getUserRequest = async () => 
    await axios.get<{}, AxiosResponse<BasicUserDto>>(`${path}/user`, { withCredentials : true});

export const updateUserNameRequest = async (userName : string) => 
    await axios.post<{userName : string}, AxiosResponse<BasicUserDto>>(`${path}/user/userName`, {userName : userName} , { withCredentials : true});

export const updatePasswordRequest = async (passwords : ChangePasswordDto) => 
    await axios.post<ChangePasswordDto, AxiosResponse<BasicUserDto>>(`${path}/user/password`, passwords, { withCredentials : true});

export const updateProfilePictureRequest = async (picture : string) => 
    await axios.post<{picture : string}, AxiosResponse<BasicUserDto>>(`${path}/user/picture`, {picture : picture}, { withCredentials : true});