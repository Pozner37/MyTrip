import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BasicUserDto, User } from '../../dtos/userDtos';

export interface UserState {
    showAuthModal : boolean,
    user : User | undefined
}

const initialState : UserState = {
    showAuthModal : false,
    user : undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setShowAuthModal : (state, action : PayloadAction<boolean>)=>{
            state.showAuthModal = action.payload;
        },
        setUser : (state, action : PayloadAction<User>) => {
            state.user = action.payload;
        },
        logoutUserName : (state) => {
            state.user = undefined
        },
    }
});

export const { setShowAuthModal, setUser, logoutUserName } = userSlice.actions

export default userSlice.reducer

