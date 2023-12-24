import axios from "axios";
import { LoginProps } from "../components/Login";

export const register = async (data : LoginProps) => 
    await axios.post('http://localhost:5000/api/v1/auth/register', data);

export const login = async (data : LoginProps) => 
    await axios.post('http://localhost:5000/api/v1/auth/login', data);