import axios, { AxiosResponse } from "axios";
import { User, LoginDto } from "../dtos/userDtos";

const path = 'http://localhost:3000'

interface CookiesProps {
    accessToken : string,
    refreshToken : string
}

export const registerRequest = async (data : User) => 
    await axios.post<User, AxiosResponse<{}>>(`${path}/auth/register`, data);

export const loginRequest = async (data : LoginDto) => 
    await axios.post<LoginDto, AxiosResponse<User & CookiesProps>>(`${path}/auth/login`, data);

export const getUserRequest = async () => 
    await axios.get<{}, AxiosResponse<User>>(`${path}/user`, { withCredentials : true});

export const updateUserRequest = async (user : User) => 
    await axios.post<User, AxiosResponse<User>>(`${path}/user/update`, user, { withCredentials : true});
    
export const logoutRequest = async () => 
    await axios.post<{}, AxiosResponse<{}>>(`${path}/auth/logout`, undefined, {withCredentials : true});
    
export const googleLoginRequest = async (token : string) => 
    await axios.post<{token : string}, AxiosResponse<User & CookiesProps>>(`${path}/auth/google`, {token : token});