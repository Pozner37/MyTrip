import { useEffect } from "react"
import { getUser } from "../utils/authUtils"
import { useDispatch } from "react-redux"
import { setUser } from "../redux/reducers/UserReducer";

const useGetUser = ()=> {
    const dispatch = useDispatch();
    useEffect(() => {
        getUser().then(res => res.data.userName &&
            dispatch(setUser(res.data))
        ).catch(err => console.log(err))
      }, [dispatch])
}

export default useGetUser;