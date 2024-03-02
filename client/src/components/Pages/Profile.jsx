import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateInternships } from '../../store/internshipslice'
import { Link } from 'react-router-dom'

function Profile() {

    const user = JSON.parse(localStorage.getItem("credentials"))

    const dispatch = useDispatch()

    const [internships, setInternships] = useState([])
    const [students, setStudents] = useState(0)

    const deleteInternship = (id) => {
        axios.delete(`http://localhost:8080/internship/${id}`)
            .then((res) => {
                setInternships(prev => prev.filter(internship => internship.id !== id))
                dispatch(updateInternships(internships.filter(internship => internship.id !== id)))
            })
            .catch(err => console.log(err.response.data.message))
    }

   
    useEffect(() => {
        axios.get(`http://localhost:8080/user/${user.username}`)
            .then(res => {
                setInternships(res.data.internships)
                res?.data?.internships.forEach(data => {
                    setStudents(prev => prev + data?.studentsEnrolled?.filter(stud => stud!==null).length)
                })
            })
            .catch(err => console.log(err))

    }, [setInternships])

    return (
        <>
            <Navbar />
            <div className="w-full lg:w-[90%] xl:w-[80%] px-0 sm:px-16 mx-auto flex flex-col gap-6 text-center py-[8rem] ">
                <h3 className="font-bold my-2 text-4xl">My Internships</h3>
                <h3 className="font-bold my-4 text-2xl">
                    <p>Total Courses : {internships?.filter(stud => stud!==null).length}</p>
                    {user?.role === "Admin" &&
                        <p>Students Enrolled : {students}</p>
                    }
                </h3>
                <div className='flex items-center justify-between'>
                    <p className="text-base font-bold w-[40%] sm:w-[25%]">Position</p>
                    {
                        user?.role === "User" &&
                        <p className="text-base font-bold w-[33%] sm:w-[25%]">Organisation</p>
                    }

                    <p className="text-base font-bold w-[33%] sm:w-[25%] hidden sm:block">Stipend</p>

                    <p className="text-base font-bold w-[33%] sm:w-[25%]">Price</p>
                    {
                        user?.role === "Admin" &&
                        <p className="text-base font-bold w-[20%] sm:w-[25%]">Students</p>
                    }
                    {
                        user?.role === "Admin" &&
                        <p className="text-base font-bold w-[33%] sm:w-[25%]">Update</p>
                    }
                    {
                        user?.role === "Admin" &&
                        <p className="text-base font-bold w-[20%] sm:w-[25%]">Delete</p>
                    }
                </div>
                <h2 className="text-base font-bold"> </h2>
                {internships &&
                    internships.map((data, index) => (
                        <Link to={user?.role === "User" ?  `/internship/${data.id}` : null} key={index} className='z-20 flex items-center justify-between shadow-lg py-2 cursor-pointer'>
                            <p className="w-[40%] sm:w-[25%]">{data.position}</p>
                            {
                                user?.role === "User" &&
                                <p className="w-[33%] sm:w-[25%]">{data.organisation}</p>
                            }

                            <p className="w-[33%] sm:w-[25%] hidden sm:block">{data.stipend}</p>

                            <p className="w-[33%] sm:w-[25%]">{data.price}</p>
                            {
                                user?.role === "Admin" &&
                                <p className="w-[33%] sm:w-[25%] cursor-pointer">{ data?.studentsEnrolled.filter(stud => stud!==null).length}</p>
                            }
                            {
                                user?.role === "Admin" &&
                                <p className="w-[33%] sm:w-[25%] cursor-pointer"><Link to={`/update/${data.id}`}><i className="fa-solid fa-pencil"></i></Link></p>
                            }
                            {
                                user?.role === "Admin" &&
                                <p onClick={() => deleteInternship(data.id)} className="w-[20%] sm:w-[25%] cursor-pointer z-50"><i className="fa-solid fa-trash"></i></p>
                            }
                        </Link>
                    ))
                }

            </div>
        </>
    )
}

export default Profile
