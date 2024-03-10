import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    internships:[],
    test:[]
}

export const internshipSlice = createSlice({
    name:"internships",
    initialState,
    reducers:{
        updateInternships:(state,action)=>{
            state.internships = action.payload
        },
        setTest:(state,action)=>{
            state.test = action.payload
        }
    }
})

export const {updateInternships} = internshipSlice.actions

export default internshipSlice.reducer