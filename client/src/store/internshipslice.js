import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    internships:[],
    userInternships:[]
}

export const internshipSlice = createSlice({
    name:"internships",
    initialState,
    reducers:{
        updateInternships:(state,action)=>{
            state.internships = action.payload
        },
        updateUserInternships:(state,action)=>{
            state.userInternships = action.payload
        }
    }
})

export const {updateInternships,updateUserInternships} = internshipSlice.actions

export default internshipSlice.reducer