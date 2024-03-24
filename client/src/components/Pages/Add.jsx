import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateInternships } from '../../store/internshipslice'
import Footer from '../Footer/Footer'

function Add() {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("credentials"))

    const internships = useSelector(state => state.internships)

    const dispatch = useDispatch()

    const [form, setForm] = useState({})
    const [skills, setSkills] = useState([""])
    const [perks, setPerks] = useState([""])
    const [question, setQuestion] = useState([])
    const [options, setOptions] = useState([{}, {}, {}, {}])
    const [lessons, setLessons] = useState([])
    const [image, setImage] = useState("")

    let newSkills = [...skills]
    let newPerks = [...perks]
    let newQuestion = [...question]
    let newLessons = [...lessons]

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submit = (e) => {

        e.preventDefault()

        newLessons.forEach((newL, index) => {
            if (newL.url?.split("/")[3]?.split("=")[0]?.split("?")[0]?.length > 8)
                newLessons[index].url = newL.url?.split("/")[3]?.split("=")[0]?.split("?")[0] || newLessons[index].url
            else {
                newLessons[index].url = newL.url?.split("/")[3]?.split("=")[1]?.split("&")[0] || newLessons[index].url
            }
        })

        if (image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "skillwallah")
            data.append("cloud_name", "dwrwxeoih")

            axios.post("https://api.cloudinary.com/v1_1/dwrwxeoih/image/upload", data)
                .then(res => {
                    axios.post("http://localhost:8080/api/internship", { ...form, skills: newSkills, perks: newPerks, questions: newQuestion, lessons: [...newLessons], imageUrl: res.data.secure_url }, {
                        headers: {
                            "Authorization": user?.token,
                            "Content-Type": "application/json"
                        }
                    })
                        .then((response) => {
                            document.getElementById("error").innerText = response.data.message;
                            dispatch(updateInternships([...internships, response.data.internship]))
                            // setTimeout(() => {
                            //     navigate("/")
                            // }, 1000)
                        })
                        .catch((err) => {
                            document.getElementById("error").innerText = err.response.data.message
                        })
                        .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
                })
                .catch((err) => {
                    document.getElementById("error").innerText = err.response.data.message
                })
        } else {
            axios.post("http://localhost:8080/api/internship", { ...form, skills: newSkills, perks: newPerks, questions: newQuestion, lessons: [...newLessons]}, {
                headers: {
                    "Authorization": user?.token,
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    document.getElementById("error").innerText = response.data.message;
                    dispatch(updateInternships([...internships, response.data.internship]))
                    // setTimeout(() => {
                    //     navigate("/")
                    // }, 1000)
                })
                .catch((err) => {
                    document.getElementById("error").innerText = err.response.data.message
                })
                .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
        }

    }

    return (
        <>
            <Navbar />
            <div className="h-screen overflow-y-auto">

                <div className='min-h-screen flex flex-col gap-6 w-[90%] md:w-[85%] xl:w-[70%] mx-auto py-12 pt-[8rem]'>

                    <h3 className="font-bold my-2 text-3xl sm:text-4xl">Add New Internship</h3>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                        <input type="text" name="name" onChange={handleChange} placeholder="Enter Course Name" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                        <select type="text" name="branch" onChange={handleChange} placeholder="Enter Branch Name" className='border-2 bg-transparent rounded-xl  outline-[#1B88F4] p-3' >
                            <option className='bg-transparent'>Select Branch</option>
                            <option className='bg-transparent' value="Computer">Computer Science Engineering / IT</option>
                            <option className='bg-transparent' value="Mechanical">Mechanical Engineering</option>
                            <option className='bg-transparent' value="Civil">Civil Engineering</option>
                            <option className='bg-transparent' value="Mining">Mining Engineering</option>
                            <option className='bg-transparent' value="Electronics">EE / ECE / EEE / VLSI</option>
                        </select>
                        <input type="number" name="duration" onChange={handleChange} placeholder="Enter Duration (in weeks)" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                        <input type="number" name="price" onChange={handleChange} placeholder="Enter price" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                        <input type="number" name="discount" onChange={handleChange} placeholder="Enter Discount (in percentage)" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                    </div>

                    <div className="flex items-baseline gap-8 justify-between sm:justify-normal">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                            {
                                skills.map((count, index) => (
                                    <input key={index} type="text" name="skills" id="skills" onChange={e => { newSkills[index] = e.target.value; setSkills(newSkills) }} placeholder="Enter skills" className=' border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                ))
                            }
                        </div>
                        <div className=" text-xs cursor-pointer gap-8 sm:gap-4 flex sm:flex-row flex-col justify-end">

                            <p onClick={() => setSkills((prev) => [...prev, ""])} className='w-[7rem] text-center border border-gray-600 p-3 rounded-xl'>add skill</p>

                            {
                                skills.length > 1 &&
                                <p onClick={() => setSkills((prev) => prev.slice(0, -1))} className='w-[7rem] text-center border border-gray-600 p-3 rounded-xl'>remove skill</p>
                            }
                        </div>
                    </div>

                    <div className="flex items-baseline gap-8 justify-between sm:justify-normal">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {
                                perks.map((perk, index) => (
                                    <input key={index} type="text" name="perks" id="perks" onChange={e => { newPerks[index] = e.target.value; setPerks(newPerks) }} placeholder="Enter perks" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                ))
                            }</div>

                        <div className=" text-xs cursor-pointer gap-8 sm:gap-4 flex sm:flex-row flex-col justify-end">
                            <p onClick={() => setPerks((prev) => [...prev, prev[prev.length - 1] + 1])} className='w-[7rem] text-center border border-gray-600 p-3 rounded-xl'>add perk</p>
                            {
                                perks.length > 1 &&
                                <p onClick={() => setPerks((prev) => prev.slice(0, -1))} className='w-[7rem] text-center border border-gray-600 p-3 rounded-xl'>remove perk</p>
                            }

                        </div>
                    </div>

                    <div className="flex items-baseline gap-8 justify-between sm:justify-normal">

                        <div className="flex items-center justify-between w-full">
                            <p className='w-max  p-3 rounded-xl'>Add Lesson !</p>
                        </div>

                        <div className=" text-xs cursor-pointer gap-8 sm:gap-4 flex sm:flex-row flex-col justify-end">
                            <p onClick={() => setLessons((prev) => [...prev, { lesson: "", url: "", description: "" }])} className='w-[7rem] text-center border border-gray-600 p-3 rounded-xl'>add Lesson</p>
                            {
                                lessons.length > 0 &&
                                <p onClick={() => setLessons((prev) => prev.slice(0, -1))} className='w-[7rem] text-center border border-gray-600 p-3 rounded-xl'>remove Lesson</p>
                            }
                        </div>

                    </div>

                    {
                        lessons &&
                        lessons.map((perk, index) => (
                            <div className="question flex flex-col gap-4" key={index}>
                                <input type="text" name="lesson" onChange={e => { newLessons[index].lesson = e.target.value }} placeholder="Enter Lesson name" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                <input type="text" name="url" onChange={e => { newLessons[index].url = e.target.value }} placeholder="Enter url (youtube video)" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                <input type="text" name="description" onChange={e => { newLessons[index].description = e.target.value }} placeholder="Enter description" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                            </div>
                        ))
                    }

                    <div className="flex items-baseline gap-8 justify-between sm:justify-normal">
                        <div className="flex items-center justify-between w-full">
                            <p className='w-max p-3 rounded-xl'>Add Test !</p>
                        </div>

                        <div className="text-xs cursor-pointer gap-8 sm:gap-4 flex sm:flex-row flex-col justify-end">
                            <p onClick={() => setQuestion((prev) => [...prev, { question: "", options: [{ option: "", correct: false }, { option: "", correct: false }, { option: "", correct: false }, { option: "", correct: false }] }])} className='w-[7rem] text-center border border-gray-600 p-3 rounded-xl'>add question</p>
                            {
                                question.length > 0 &&
                                <p onClick={() => setQuestion((prev) => prev.slice(0, -1))} className='w-[7rem] text-center border border-gray-600 p-3 rounded-xl'>remove ques...</p>
                            }
                        </div>
                    </div>
                    {
                        question &&
                        question.map((perk, index) => (
                            <div className="question flex flex-col gap-4" key={index}>
                                <input type="text" name="question" onChange={e => { newQuestion[index].question = e.target.value }} placeholder="Enter question" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                {
                                    options.map((option, optionIndex) => (
                                        <div className="flex gap-2 option" key={optionIndex}>
                                            <input type="checkbox" name="correct" onChange={e => { newQuestion[index].options[optionIndex].correct = e.target.checked }} placeholder="Enter correct" className='w-4 border-2 rounded-xl  outline-[#1B88F4] ' />
                                            <input type="text" name="option" onChange={e => { newQuestion[index].options[optionIndex].option = e.target.value }} placeholder="Enter option" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                        </div>
                                    ))
                                }

                            </div>
                        ))
                    }

                    <div className="flex items-center justify-between">
                        <p className='w-max  p-3 rounded-xl'>Add Assignment !</p>
                    </div>

                    <input type="text" name="assignmentTask" onChange={handleChange} placeholder="Enter description" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                    <input type="text" name="assignmentUrl" onChange={handleChange} placeholder="Enter drive link" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />

                    <p className='w-max p-3 rounded-xl'>Add Thumbnail !</p>
                    <label htmlFor="dpFile" className=''>
                        <input id="dpFile" type="file" onChange={e => setImage(e.target.files[0])} className='w-[11rem] text-xs ' />
                    </label>

                    <p className="text-red-500 font-medium h-6" id="error"></p>
                    <button className="btn text-sm outline-white" onClick={submit}>Add Internship</button>

                    {/* <div className="w-full text-center font-medium">
                    <p>Don't have an account? <span onClick={() => navigate("/signup")} className='text-red-500 hover:underline cursor-pointer'>Sign Up</span></p>
                </div>  */}
                </div >
                <Footer />
            </div>
        </>
    )
}

export default Add
