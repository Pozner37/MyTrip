import { useEffect } from "react"
import { getUser } from "../utils/authUtils"
import { useDispatch } from "react-redux"
import { setUserName } from "../redux/reducers/UserReducer";

const useGetUser = ()=> {
    const dispatch = useDispatch();
    useEffect(() => {
        getUser().then(res => res.data.userName &&
            dispatch(setUserName(res.data.userName))
        ).catch(err => console.log(err))
      }, [])
}

export default useGetUser;