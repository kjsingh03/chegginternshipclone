import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    internships:[]
}

export const internshipSlice = createSlice({
    name:"internships",
    initialState,
    reducers:{
        updateInternships:(state,action)=>{
            state.internships = action.payload
        }
    }
})

export const {updateInternships} = internshipSlice.actions

export default internshipSlice.reducer