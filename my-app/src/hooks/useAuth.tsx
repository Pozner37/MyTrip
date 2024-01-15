import { useDispatch } from "react-redux";
import { googleLoginRequest, loginRequest, logoutRequest, registerRequest } from "../utils/authUtils";
import { logoutUserName, setUser } from "../redux/reducers/UserReducer";
import Cookies from "universal-cookie";
import { BasicUserDto, LoginDto, User } from "../dtos/userDtos";
import { AxiosResponse } from "axios";

const useAuth = () => {
    const dispatch = useDispatch();

    const register = async (user : User) : Promise<AxiosResponse<{} | string>> => {
        return await registerRequest(user).then(
            res => {
                if (res.status === 201) {
                    console.log(`${res.data} register successfuly`)
                } else {
                    console.error(res)
                }
                return res;
            }
        ).catch((err : any)=> {
            console.log(err);
            return err.response;
        })
    }

    const login = async (loginDto : LoginDto) : Promise<AxiosResponse<BasicUserDto | string>> => {
        console.log('Logging in with:', loginDto);
        return await loginRequest({userName: loginDto.userName, password : loginDto.password}).then(res => {
            if (res.status === 200) {
                console.log(`${res.data} login successfuly`)
                const cookies = new Cookies();
                cookies.set('refresh_token', res.data.refreshToken)
                cookies.set('access_token', res.data.accessToken)
                dispatch(setUser(res.data))
            }
            return res;
        }).catch((err : any) => {            
            console.log(err);
            return err.response
        });
    }

    const logout = async () => {
        return await logoutRequest().then(res => {
            if (res.status === 200){
                console.log('logout successfuly')
                dispatch(logoutUserName())
            }
        }).catch(err => {
            console.error(err);
            return err.response;
         })
    }

    const googleLogin = async (token : string) => {
        console.log('Trying Logging in with google:');
        return await googleLoginRequest(token).then(res => {
            if (res.status === 200) {
                console.log(`${res.data} login successfuly`)
                dispatch(setUser(res.data))
            }
        }).catch(err => {
            console.error(err);
            return err.response;
         })
    }

    return { register, login, logout, googleLogin }
}

export default useAuth;