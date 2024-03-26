import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    internships:[],
    userInternships:[],
    thumbnails:[]
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
        },
        setThumbnails:(state,action)=>{
            state.thumbnails=action.payload
        }
    }
})

export const {updateInternships,updateUserInternships,setThumbnails} = internshipSlice.actions

export default internshipSlice.reducer