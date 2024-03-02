import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Add() {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("credentials"))

    const [form, setForm] = useState({})
    const [skills, setSkills] = useState([""])
    const [perks, setPerks] = useState([""])

    let newSkills = [...skills]
    let newPerks = [...perks]

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const submit = () => {
        
        axios.post("http://localhost:8080/internship", { ...form, skills:skills, perks:perks }, {
            headers: {
                "Authorization": user?.token,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                document.getElementById("error").innerText = res.data.message;
                // setTimeout(()=>{
                //     navigate("/")
                // },1000)
            })
            .catch((err) => {
                document.getElementById("error").innerText = err.response.data.message
            })
            .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
        
    }

    return (
        <>
            <Navbar />
            <div className='min-h-screen flex flex-col gap-6 w-[90%] sm:w-[50%] md:w-[40%] xl:w-[30%] mx-auto py-12 shadow-lg pt-[8rem]'>

                <input type="text" name="position" onChange={handleChange} placeholder="Enter position" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input type="text" name="organisation" onChange={handleChange} placeholder="Enter organisation" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input type="text" name="location" onChange={handleChange} placeholder="Enter location" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input type="number" name="stipend" onChange={handleChange} placeholder="Enter stipend" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input type="number" name="startTime" onChange={handleChange} placeholder="Enter duration (in Months)" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input type="date" name="lastApplyDate" onChange={handleChange} placeholder="Enter lastApplyDate" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                {
                    skills.map((count, index) => (
                        <input key={index} type="text" name="skills" id="skills" onChange={e => {newSkills[index]=e.target.value ;setSkills([...newSkills])}} placeholder="Enter skills" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                    ))
                }
                <div className="text-gray-600 w-full text-xs cursor-pointer flex justify-end">
                    <p onClick={() => setSkills((prev) => [...prev, ""])} className='w-max border border-gray-600 p-3 rounded-xl'>add skill</p>
                </div>
                {
                    perks.map((perk, index) => (
                        <input key={index} type="text" name="perks" id="perks" onChange={e => {newPerks[index]=e.target.value; setPerks([...newPerks])}} placeholder="Enter perks" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                    ))
                }
                <div className="text-gray-600 w-full text-xs cursor-pointer flex justify-end">
                    <p onClick={() => setPerks((prev) => [...prev, prev[prev.length - 1] + 1])} className='w-max border border-gray-600 p-3 rounded-xl'>add perk</p>
                </div>
                <input type="number" name="price" onChange={handleChange} placeholder="Enter price" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <p className="text-red-500 font-medium h-6" id="error"></p>
                <div className="btn text-sm" onClick={submit}>Add Internship</div>
                {/* <div className="w-full text-center font-medium">
                    <p>Don't have an account? <span onClick={() => navigate("/signup")} className='text-red-500 hover:underline cursor-pointer'>Sign Up</span></p>
                </div> */}
            </div>
        </>
    )
}

export default Add
