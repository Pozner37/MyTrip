import axios from "axios";
import { User } from "../components/SignUp";

interface LoginUserDto {
    userName : string;
    password : string;
}

export const register = async (data : User) => 
    await axios.post('http://localhost:3000/auth/register', data);

export const login = async (data : LoginUserDto) => 
    await axios.post('http://localhost:3000/auth/login', data);

export const getUser = async () => 
    await axios.get('http://localhost:3000/auth/user', {withCredentials : true});
    
export const logout = async () => 
    await axios.post('http://localhost:3000/auth/logout', {withCredentials : true});