import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forget() {

    const navigate = useNavigate()

    const [form, setForm] = useState({})
    const [verify, setVerify] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const submit = (e) => {
        e.preventDefault();

        if (!verify) {
            axios.post(`${import.meta.env.VITE_API_KEY}/api/auth/forgetpassword`, form)
                .then((res) => {
                    document.getElementById("error").innerText = res.data.message;
                    setVerify(res.data.verified)
                })
                .catch((err) => document.getElementById("error").innerText = err.response.data.message)
                .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
        }
        else {
            if(form?.password?.length>=8){
                axios.post(`${import.meta.env.VITE_API_KEY}/api/auth/forgetpassword`, { ...form, verified: verify })
                    .then((res) => {
                        document.getElementById("error").innerText = res.data.message;
                        if(res.data.verified){
                            setTimeout(() => navigate("/login"), 1000)
                            localStorage.setItem("credentials", JSON.stringify(res.data.user))
                        }
                    })
                    .catch((err) => document.getElementById("error").innerText = err.response.data.message)
                    .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
            }
            else{
                document.getElementById("error").innerText = "Password must be atleast 8 characters long";
                setTimeout(() => document.getElementById("error").innerText = " ", 1000)
            }
        }
    }

    return (
        <>
            <div className="h-screen overflow-y-auto">
                <div className='min-h-screen flex flex-col items-center gap-6 w-[90%] sm:w-[50%] md:w-[40%] xl:w-[30%] mx-auto py-12 pt-[8rem]'>

                    <input type="text" name="username" onChange={handleChange} placeholder="Enter Username" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                    <input type="date" name="birthDate" onChange={handleChange} placeholder="Enter Date of Birth" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                    {
                        verify &&
                        <input type="text" name="password" onChange={handleChange} placeholder="Enter Password" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                    }

                    <p className="text-red-500  font-medium h-6" id="error"></p>
                    <button className="btn text-sm w-max" onClick={submit}>Submit</button>

                </div>
            </div>
        </>
    )
}

export default Forget
