import axios, { AxiosResponse } from "axios";
import { User, LoginDto, BasicUserDto } from "../dtos/userDtos";

const path = process.env.REACT_APP_SERVER_PATH;

export const registerRequest = async (data : User) => 
    await axios.post<User, AxiosResponse<{}>>(`${path}/auth/register`, data);

export const loginRequest = async (data : LoginDto) => 
    await axios.post<LoginDto, AxiosResponse<BasicUserDto>>(`${path}/auth/login`, data);
    
export const logoutRequest = async () => 
    await axios.post<{}, AxiosResponse<{}>>(`${path}/auth/logout`, undefined, {withCredentials : true});
    
export const googleLoginRequest = async (token : string) => 
    await axios.post<{token : string}, AxiosResponse<BasicUserDto>>(`${path}/auth/google`, {token : token});