import axios from "axios";
import { User } from "../components/SignUp";

interface LoginUserDto {
    userName : string;
    password : string;
}

export const register = async (data : User) => 
    await axios.post('http://localhost:5000/auth/register', data);

export const login = async (data : LoginUserDto) => 
    await axios.post('http://localhost:5000/auth/login', data);