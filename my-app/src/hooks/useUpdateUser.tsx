import { useDispatch } from "react-redux"
import { BasicUserDto, ChangePasswordDto, User } from "../dtos/userDtos"
import { setUser } from "../redux/reducers/UserReducer"
import { updatePasswordRequest, updateProfilePictureRequest, updateUserNameRequest } from "../utils/userUtils";
import { AxiosResponse } from "axios";

const useUpdateUser = () => {
    const dispatch = useDispatch();

    const updateUserName = async (userName : string) : Promise<AxiosResponse<BasicUserDto | string>> => {
        return await updateUserNameRequest(userName).then(res => {
            if (res.status === 200) {
                console.log(`${res.data} update userName successfuly`)
                dispatch(setUser(res.data))
            }
            return res;
        }).catch(err => {
            console.error(err);
            return err.response;
         })
    }

    const updatePassword = async (passwords : ChangePasswordDto) : Promise<AxiosResponse<BasicUserDto | string>> => {
        return await updatePasswordRequest(passwords).then(res => {
            if (res.status === 200) {
                console.log(`${res.data} update userName successfuly`)
                dispatch(setUser(res.data))
            }
            return res;
        }).catch(err => {
            console.error(err);
            return err.response;
         })
    }


    const updateProfileImage = async (image : string) : Promise<AxiosResponse<BasicUserDto | string>> => {
        return await updateProfilePictureRequest(image).then(res => {
            if (res.status === 200) {
                console.log(`${res.data} update userName successfuly`)
                dispatch(setUser(res.data))
            }
            return res;
        }).catch(err => {
            console.error(err);
            return err.response;
         })
    }
    return {updateUserName, updatePassword, updateProfileImage}
}

export default useUpdateUser;