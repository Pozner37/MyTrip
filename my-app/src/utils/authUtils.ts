import axios, { AxiosResponse } from "axios";
import { User, LoginDto, BasicUserDto } from "../dtos/userDtos";

const path = 'http://10.0.0.21:3000'

export const register = async (data : User) => 
    await axios.post<User, AxiosResponse<{}>>(`${path}/auth/register`, data);

export const login = async (data : LoginDto) => 
    await axios.post<LoginDto, AxiosResponse<BasicUserDto>>(`${path}/auth/login`, data);

export const getUser = async () => 
    await axios.get<{}, AxiosResponse<BasicUserDto>>(`${path}/auth/user`, {withCredentials : true});
    
export const logout = async () => 
    await axios.post<{}, AxiosResponse<{}>>(`${path}/auth/logout`, undefined, {withCredentials : true});
    
export const googleLogin = async (token : string) => 
    await axios.post<{token : string}, AxiosResponse<BasicUserDto>>(`${path}/auth/google`, {token : token});