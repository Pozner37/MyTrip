import { useEffect } from "react"
import { getUserRequest } from "../utils/userUtils"
import { useDispatch } from "react-redux"
import { setUser } from "../redux/reducers/UserReducer";

const useGetUser = ()=> {
    const dispatch = useDispatch();
    useEffect(() => {
        getUserRequest().then(res => res.data.userName &&
            dispatch(setUser(res.data))
        ).catch(err => console.error(err))
    }, [dispatch])
}

export default useGetUser;