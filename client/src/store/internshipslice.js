import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    internships:[],
    userInternships:[],
    thumbnails:[],
    loader:false
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
        },
        setLoader:(state,action)=>{
            state.loader = action.payload
        }
    }
})

export const {updateInternships,updateUserInternships,setThumbnails,setLoader} = internshipSlice.actions

export default internshipSlice.reducer