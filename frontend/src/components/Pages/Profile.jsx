import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateInternships } from '../../store/internshipslice'

function Profile() {

    const user = JSON.parse(localStorage.getItem("credentials"))

    const dispatch = useDispatch()

    const [internships, setInternships] = useState([])

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
            .then(res => setInternships(res.data.internships))
            .catch(err => console.log(err))
    }, [setInternships])

    return (
        <>
            <Navbar />
            <div className="w-full lg:w-[90%] xl:w-[80%] px-0 sm:px-16 mx-auto flex flex-col gap-6 text-center py-[8rem] ">
                <h3 className="font-bold my-10 text-4xl">My Internships</h3>
                <div className='flex items-center justify-between'>
                    <p className="text-base font-bold w-[40%] sm:w-[25%]">Position</p>
                    {
                        user?.role === "User" &&
                        <p className="text-base font-bold w-[33%] sm:w-[25%]">Organisation</p>
                    }
                    
                        <p className="text-base font-bold w-[33%] sm:w-[25%] hidden sm:block">Stipend</p>
                    
                    <p className="text-base font-bold w-[33%] sm:w-[25%]">Price</p>
                    {/* {
                        user?.role === "Organisation" &&
                        <p className="text-base font-bold w-[33%] sm:w-[25%]">Update</p>
                    } */}
                    {
                        user?.role === "Organisation" &&
                        <p className="text-base font-bold w-[20%] sm:w-[25%]">Delete</p>
                    }
                </div>
                <h2 className="text-base font-bold"> </h2>
                {internships &&
                    internships.map((data, index) => (
                        <div key={index} className='flex items-center justify-between'>
                            <p className="w-[40%] sm:w-[25%]">{data.position}</p>
                            {
                                user?.role === "User" &&
                                <p className="w-[33%] sm:w-[25%]">{data.organisation}</p>
                            }
                           
                                <p className="w-[33%] sm:w-[25%] hidden sm:block">{data.stipend}</p>
                            
                            <p className="w-[33%] sm:w-[25%]">{data.price}</p>
                            {/* {
                                user?.role === "Organisation" &&
                                <p className="w-[33%] sm:w-[25%] cursor-pointer"><i className="fa-solid fa-pencil"></i></p>
                            } */}
                            {
                                user?.role === "Organisation" &&
                                <p onClick={() => deleteInternship(data.id)} className="w-[20%] sm:w-[25%] cursor-pointer"><i className="fa-solid fa-trash"></i></p>
                            }
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default Profile
