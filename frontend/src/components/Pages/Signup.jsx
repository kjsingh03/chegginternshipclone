import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Navbar/Navbar'

function Signup() {

    const navigate = useNavigate()

    const [form, setForm] = useState({})
    const [role, setRole] = useState("User")

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submit = () => {
        axios.post("http://localhost:8080/auth/signup", { ...form, role })
            .then((res) => {
                document.getElementById("error").innerText = res.data.message;
                setTimeout(() => navigate("/"), 1000)
                localStorage.setItem("credentials", JSON.stringify(res.data.user))
            })
            .catch((err) => document.getElementById("error").innerText = err.response.data.message)
            .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
    }

    const setUserType = (e) => {
        const activeRole = document.querySelector(".role.active")
        activeRole.classList.remove("active")
        e.target.classList.add("active")
        setRole(e.target.innerText)
    }

    console.log(role)


    return (
        <>
            <Navbar />
            <div className='min-h-screen flex flex-col gap-6 w-[90%] sm:w-[50%] md:w-[40%] xl:w-[30%] mx-auto py-12 shadow-lg pt-[8rem]'>
                <div className="flex items-center justify-between rounded-xl overflow-hidden px-3 py-2 bg-[#EB7100]">
                    <p onClick={setUserType} className="role active w-[50%] rounded-xl text-center py-1.5 font-medium cursor-pointer">User</p>
                    <p onClick={setUserType} className="role w-[50%] rounded-xl text-center py-1.5 font-medium cursor-pointer">Organisation</p>
                </div>
                <input type="text" name="username" onChange={handleChange} placeholder="Enter Username" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input type="text" name="password" onChange={handleChange} placeholder="Enter Password" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <p className="text-red-500 font-medium h-6" id="error"></p>
                <div className="btn text-sm" onClick={submit}>Sign Up</div>
                <div className="w-full text-center font-medium">
                    <p>Don't have an account? <span onClick={() => navigate("/login")} className='text-red-500 hover:underline cursor-pointer'>Sign In</span></p>
                </div>
            </div>
        </>
    )
}

export default Signup
