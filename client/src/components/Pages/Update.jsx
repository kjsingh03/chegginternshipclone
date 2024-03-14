import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateInternships } from '../../store/internshipslice'
import Footer from '../Footer/Footer'

function Update() {

    const { id } = useParams();

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const internships = useSelector(state => state.internships)

    const user = JSON.parse(localStorage.getItem("credentials"))

    const [internship, setInternship] = useState({})
    const [form, setForm] = useState({})
    const [skills, setSkills] = useState([])
    const [perks, setPerks] = useState([])
    const [question, setQuestion] = useState([])
    const [options, setOptions] = useState([{}, {}, {}, {}])
    const [lessons, setLessons] = useState([])


    let newSkills = [...skills]
    let newPerks = [...perks]
    let newQuestion = [...question]
    let newLessons = [...lessons]


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const submit = () => {

        newLessons.forEach((newL, index) => {
            if (newL.url?.split("/")[3]?.split("=")[0]?.split("?")[0]?.length > 8)
                newLessons[index].url = newL.url?.split("/")[3]?.split("=")[0]?.split("?")[0] || newLessons[index].url
            else {
                newLessons[index].url = newL.url?.split("/")[3]?.split("=")[1]?.split("&")[0] || newLessons[index].url
            }
        })

        axios.put(`http://localhost:8080/internship/${id}`, { ...form, skills: newSkills, perks: newPerks, questions: newQuestion, lessons: [...newLessons] }, {
            headers: {
                "Authorization": user?.token,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                document.getElementById("error").innerText = res.data.message;

                // setTimeout(() => {
                //     navigate("/profile")
                // }, 500)
            })
            .catch((err) => {
                document.getElementById("error").innerText = err.response.data.message
            })
            .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/internship/${id}`)
            .then(res => {
                setInternship(res.data.internship)
                let keys = Object.keys(res.data.internship);
                keys = keys.filter(key => key !== 'certificates' && key !== 'studentsEnrolled')
                let newForm = {}
                keys.forEach(key => newForm[`${key}`] = res.data.internship[`${key}`])
                setForm(newForm)
                setLessons(res.data.internship.lessons)
                setQuestion(res.data.internship.questions)
                setSkills(res.data.internship.skills)
                setPerks(res.data.internship.perks)
            })
            .catch(err => document.getElementById("error").innerText = err.response.data.message
            )
    }, [])

    const deleteInternship = () => {
        console.log(id)
        axios.delete(`http://localhost:8080/internship/${id}`)
            .then((res) => {
                dispatch(updateInternships(internships.filter(internship => internship.id !== id)))
                navigate("/courses")
            })
            .catch(err => console.log(err.response.data.message))
    }

    return (
        <>
            <Navbar />
            <div className="h-screen overflow-y-auto">

                <div className='min-h-screen flex flex-col gap-6 w-[90%] md:w-[85%] xl:w-[70%] mx-auto py-12 shadow-lg pt-[8rem]'>
                    <h3 className="font-bold my-2 text-3xl sm:text-4xl">Update Internship</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                        <input value={form?.name || ""} type="text" name="name" onChange={handleChange} placeholder="Enter name" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                        <select type="text" name="branch" value={form?.branch || ""} onChange={handleChange} placeholder="Enter Branch Name" className='border-2 bg-transparent rounded-xl  outline-[#1B88F4] p-3' >
                            <option className='bg-transparent'>Select Branch</option>
                            <option className='bg-transparent' value="Computer">Computer Science Engineering / IT</option>
                            <option className='bg-transparent' value="Mechanical">Mechanical Engineering</option>
                            <option className='bg-transparent' value="Civil">Civil Engineering</option>
                            <option className='bg-transparent' value="Mining">Mining Engineering</option>
                            <option className='bg-transparent' value="Electronics">EE / ECE / EEE / VLSI</option>                </select>
                        <input value={form?.duration || ""} type="number" name="duration" onChange={handleChange} placeholder="Enter duration (in Months)" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                        <input value={form?.price || ""} type="number" name="price" onChange={handleChange} placeholder="Enter price" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                        <input value={form?.discount || ""} type="number" name="discount" onChange={handleChange} placeholder="Enter discount" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                    </div>

                    <div className="flex items-baseline gap-8 justify-between sm:justify-normal">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                            {
                                skills.map((count, index) => (
                                    <input value={newSkills[index]} key={index || ""} type="text" name="skills" onChange={e => { newSkills[index] = e.target.value; setSkills([...newSkills]) }} placeholder="Enter skills" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
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
                                    <input value={newPerks[index] || ""} key={index} type="text" name="perks" onChange={e => { newPerks[index] = e.target.value; setPerks([...newPerks]) }} placeholder="Enter perks" className=' border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                ))
                            }
                        </div>


                        <div className=" text-xs cursor-pointer gap-8 sm:gap-4 flex sm:flex-row flex-col justify-end">
                            <p onClick={() => setPerks((prev) => [...prev, ""])} className='w-[7rem] text-center border border-gray-600 p-3 rounded-xl'>add perk</p>
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
                        lessons?.map((perk, index) => (
                            <div className="question flex flex-col gap-4" key={index}>
                                <input type="text" value={lessons[index].lesson || ""} name="lesson" onChange={e => { newLessons[index].lesson = e.target.value; setLessons([...newLessons]) }} placeholder="Enter Lesson name" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                <input type="text" value={lessons[index].url || ""} name="url" onChange={e => { newLessons[index].url = e.target.value; setLessons([...newLessons]) }} placeholder="Enter url (youtube video)" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                <input type="text" value={lessons[index].description || ""} name="description" onChange={e => { newLessons[index].description = e.target.value; setLessons([...newLessons]) }} placeholder="Enter description" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                            </div>
                        ))
                    }

                    <div className="flex items-baseline gap-8 justify-between sm:justify-normal">
                        <div className="flex items-center justify-between w-full">
                            <p className='w-max  p-3 rounded-xl'>Add Test !</p>
                        </div>

                        <div className=" text-xs cursor-pointer gap-8 sm:gap-4 flex sm:flex-row flex-col justify-end">
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
                                <input type="text" value={question[index]?.question || ""} name="question" onChange={e => { newQuestion[index].question = e.target.value; setQuestion([...newQuestion]) }} placeholder="Enter question" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                {
                                    options.map((option, optionIndex) => (
                                        <div className="flex gap-2 option" key={optionIndex}>
                                            <input type="checkbox" name="correct" checked={question[index]?.options[optionIndex].correct || false} onChange={e => { newQuestion[index].options[optionIndex].correct = e.target.checked; setQuestion([...newQuestion]) }} placeholder="Enter correct" className='w-4 border-2 rounded-xl  outline-[#1B88F4] ' />
                                            <input type="text" name="option" value={question[index]?.options[optionIndex].option || ""} onChange={e => { newQuestion[index].options[optionIndex].option = e.target.value; setQuestion([...newQuestion]) }} placeholder="Enter option" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                        </div>
                                    ))
                                }

                            </div>
                        ))
                    }
                    <div className="flex items-center justify-between">
                        <p className='w-max  p-3 rounded-xl'>Add Assignment !</p>
                    </div>

                    <input type="text" value={form.assignmentTask || ""} name="assignmentTask" onChange={handleChange} placeholder="Enter description" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />
                    <input type="text" value={form.assignmentUrl || ""} name="assignmentUrl" onChange={handleChange} placeholder="Enter drive link" className='border-2 rounded-xl  outline-[#1B88F4] p-3' />

                    <p className="text-red-500 font-medium h-6" id="error"></p>

                    <div className="flex justify-between px-4 lg:px-6">
                        <div className="btn text-sm cursor-pointer" onClick={submit}>Update </div>
                        <div className="btn text-sm cursor-pointer" onClick={deleteInternship}>Delete </div>
                    </div>



                    <h3 className="font-bold my-2 text-3xl sm:text-4xl">Students Enrolled</h3>

                    <div className='flex items-center justify-between'>
                        <p className="text-base font-bold w-[50%]">Username</p>
                    </div>

                    <ul className="flex flex-col gap-3">
                        {
                            internship?.studentsEnrolled?.map((data, index) => (
                                <li className='list-disc flex items-center' key={index}>
                                    <p className='w-[50%]'>{data}</p>
                                </li>
                            ))
                        }
                    </ul>

                </div>
                <Footer />
            </div>
        </>
    )
}

export default Update
