import axios, { AxiosResponse } from "axios";
import { User, LoginDto, BasicUserDto } from "../dtos/userDtos";

export const register = async (data : User) => 
    await axios.post<User, AxiosResponse<{}>>('http://localhost:3000/auth/register', data);

export const login = async (data : LoginDto) => 
    await axios.post<LoginDto, AxiosResponse<BasicUserDto>>('http://localhost:3000/auth/login', data);

export const getUser = async () => 
    await axios.get<{}, AxiosResponse<BasicUserDto>>('http://localhost:3000/auth/user', {withCredentials : true});
    
export const logout = async () => 
    await axios.post<{}, AxiosResponse<{}>>('http://localhost:3000/auth/logout', undefined, {withCredentials : true});
export const googleLogin = async (token : string) => 
    await axios.post<{token : string}, AxiosResponse<BasicUserDto>>('http://localhost:3000/auth/google', {token : token});