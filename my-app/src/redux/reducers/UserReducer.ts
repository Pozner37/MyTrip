import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
    showAuthModal : boolean,
    userName : string | undefined
}

const initialState : UserState = {
    showAuthModal : false,
    userName : undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setShowAuthModal : (state, action : PayloadAction<boolean>)=>{
            state.showAuthModal = action.payload;
        },
        setUserName : (state, action : PayloadAction<string>) => {
            state.userName = action.payload;
        },
        logoutUserName : (state) => {
            state.userName = undefined
        },
    }
});

export const { setShowAuthModal, setUserName, logoutUserName } = userSlice.actions

export default userSlice.reducer

