import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false,
    image: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state,action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        updateUserProfile: (state,action) => {
            if(state.user) {
                state.user.image = action.payload.image
            }
        },
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
})

export const {loginSuccess, updateUserProfile, logout} = authSlice.actions
export default authSlice.reducer