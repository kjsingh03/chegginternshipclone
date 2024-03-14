import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateInternships } from '../../store/internshipslice'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Component from '../whatsapp/Component'

function Profile() {

    const user = JSON.parse(localStorage.getItem("credentials"))

    const dispatch = useDispatch()

    const [internships, setInternships] = useState([])
    const [students, setStudents] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${user.username}`)
            .then(res => {
                setInternships(res.data.internships)
                res?.data?.internships.forEach(data => {
                    setStudents(prev => prev + data?.studentsEnrolled?.filter(stud => stud !== null).length)
                })
            })
            .catch(err => console.log(err))

    }, [setInternships])

    return (
        <>
            <Navbar />
            <div className="h-screen overflow-y-auto">

                <div className="w-full min-h-screen lg:w-[90%] xl:w-[80%] px-0 sm:px-16 mx-auto flex flex-col gap-6 text-center py-[8rem] ">
                    <h3 className="font-bold my-2 text-4xl">My Courses</h3>
                    <h3 className="font-bold my-4 text-2xl">
                        <p>Total Courses : {internships?.filter(stud => stud !== null).length || 0}</p>
                        {user?.role === "Admin" &&
                            <p>Students Enrolled : {students || 0}</p>
                        }
                    </h3>
                    <div className='flex items-center sm:justify-between'>
                        <p className="text-base font-bold w-[40%] sm:w-[25%]">Course</p>
                        {
                            user.role !== 'Admin' &&

                            <p className="text-base font-bold w-[33%] sm:w-[25%]">Branch</p>
                        }
                        <p className="text-base font-bold w-[33%] sm:w-[25%]">Price</p>
                        {
                            user?.role === "Admin" &&
                            <p className="text-base font-bold w-[20%] sm:w-[25%]">Students</p>
                        }

                        {/* {
                        user?.role === "Admin" &&
                        <p className="text-base font-bold w-[20%] sm:w-[25%]">Delete</p>
                    } */}
                    </div>
                    <h2 className="text-base font-bold"> </h2>
                    {internships &&
                        internships.map((data, index) => (
                            <Link to={user?.role === "User" ? `/internship/${data.id}` : `/update/${data.id}`} key={index} className='z-20 flex items-center justify-between shadow-lg py-2 cursor-pointer'>
                                <p className="w-[40%] sm:w-[25%]">{data.name}</p>
                                {
                                    user.role !== 'Admin' &&
                                    <p className="w-[33%] sm:w-[25%]">{data.branch}</p>
                                }
                                <p className="w-[33%] sm:w-[25%]">{data.price}</p>
                                {
                                    user?.role === "Admin" &&
                                    <p className="w-[33%] sm:w-[25%] cursor-pointer">{data?.studentsEnrolled?.filter(stud => stud !== null).length || 0}</p>
                                }
                                {/* {
                                user?.role === "Admin" &&
                                <p onClick={() => deleteInternship(data.id)} className="w-[20%] sm:w-[25%] cursor-pointer z-50"><i className="fa-solid fa-trash"></i></p>
                            } */}
                            </Link>
                        ))
                    }

                </div>
                <Component />
                <Footer />
            </div>
        </>
    )
}

export default Profile
