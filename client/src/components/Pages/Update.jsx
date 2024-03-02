import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Update() {

    const navigate = useNavigate()

    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem("credentials"))

    const [form, setForm] = useState({ position: "", organisation: "", location: "", stipend: 0, price: 0, startTime: 1, lastApplyDate: "", skills: [""], perks: [""] })
    const [skills, setSkills] = useState([])
    const [perks, setPerks] = useState([])

    let newSkills = [...skills]
    let newPerks = [...perks]

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const submit = () => {

        axios.put(`http://localhost:8080/internship/${id}`, { ...form, skills: skills, perks: perks }, {
            headers: {
                "Authorization": user?.token,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                document.getElementById("error").innerText = res.data.message;
                console.log(res.data.internship)
                // setTimeout(()=>{
                //     navigate("/")
                // },1000)
            })
            .catch((err) => {
                document.getElementById("error").innerText = err
                console.log(err)
            })
            .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/internship/${id}`)
            .then(res => {
                setForm(res.data.internship)
                setSkills(res.data.internship.skills)
                setPerks(res.data.internship.perks)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <Navbar />
            <div className='min-h-screen flex flex-col gap-6 w-[90%] sm:w-[50%] md:w-[40%] xl:w-[30%] mx-auto py-12 shadow-lg pt-[8rem]'>
                <h3 className="font-bold my-2 text-4xl">Update Internship</h3>
                <input value={form.position} type="text" name="position" onChange={handleChange} placeholder="Enter position" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input value={form.organisation} type="text" name="organisation" onChange={handleChange} placeholder="Enter organisation" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input value={form.location} type="text" name="location" onChange={handleChange} placeholder="Enter location" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input value={form.stipend} type="number" name="stipend" onChange={handleChange} placeholder="Enter stipend" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input value={form.startTime} type="number" name="startTime" onChange={handleChange} placeholder="Enter duration (in Months)" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <input value={form.lastApplyDate?.split("T")[0]} type="date" name="lastApplyDate" onChange={handleChange} placeholder="Enter lastApplyDate" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                {
                    skills.map((count, index) => (
                        <input value={newSkills[index]} key={index} type="text" name="skills" id="skills" onChange={e => { newSkills[index] = e.target.value; setSkills([...newSkills]) }} placeholder="Enter skills" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                    ))
                }
                <div className="text-gray-600 w-full text-xs cursor-pointer flex justify-end">
                    <p onClick={() => setSkills((prev) => [...prev, ""])} className='w-max border border-gray-600 p-3 rounded-xl'>add skill</p>
                </div>
                {
                    perks.map((perk, index) => (
                        <input value={newPerks[index]} key={index} type="text" name="perks" id="perks" onChange={e => { newPerks[index] = e.target.value; setPerks([...newPerks]) }} placeholder="Enter perks" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                    ))
                }
                <div className="text-gray-600 w-full text-xs cursor-pointer flex justify-end">
                    <p onClick={() => setPerks((prev) => [...prev, ""])} className='w-max border border-gray-600 p-3 rounded-xl'>add perk</p>
                </div>
                <input value={form.price} type="number" name="price" onChange={handleChange} placeholder="Enter price" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />
                <p className="text-red-500 font-medium h-6" id="error"></p>
                <div className="btn text-sm" onClick={submit}>Update Internship</div>
                <h3 className="font-bold my-2 text-4xl">Students Enrolled</h3>
                <div className='flex items-center justify-between'>
                    <p className="text-base font-bold w-[50%]">Username</p>
                        <p className="text-base font-bold w-[50%]">Name</p>
                    
                </div>
                <ul className="flex flex-col gap-3">
                    {
                        form?.studentsEnrolled?.map((data,index)=>(
                            <li className='list-disc flex items-center' key={index}>
                                <p className='w-[50%]'>{data.username}</p>
                                <p className='w-[50%]'>{data.name}</p>
                            </li>
                        ))
                    }
                </ul>

            </div>
        </>
    )
}

export default Update
