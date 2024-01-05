import { useEffect } from "react"
import { getUser } from "../utils/authUtils"
import { useDispatch } from "react-redux"

const useGetUser = ()=> {
    const dispatch = useDispatch();
    useEffect(() => {
        getUser().then(res => res.data.userName &&
            dispatch(setUserName(res.data.userName))
        ).catch(err => console.log(err))
      }, [])
}

export default useGetUser;

function setUserName(userName: string): any {
    throw new Error("Function not implemented.");
}
