import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInternships } from '../../store/internshipslice'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Component from '../whatsapp/Component'
import Card from '../Cards/Card'

function Profile() {

    const user = JSON.parse(localStorage.getItem("credentials"))

    const dispatch = useDispatch()

    const [students, setStudents] = useState(0)

    const internships = useSelector(state => state.userInternships)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_KEY}/api/user/${user.username}`)
            .then(res => {
                dispatch(updateUserInternships(res.data.internships))
                res?.data?.internships.forEach(data => {
                    setStudents(prev => prev + data?.studentsEnrolled?.filter(stud => stud !== null).length)
                })
            })
            .catch(err => console.log(err))

    }, [updateUserInternships])


    const deleteInternship = (id) => {
        axios.delete(`${import.meta.env.VITE_API_KEY}/api/internship/${id}`)
            .then((res) => {
                dispatch(updateUserInternships(internships.filter(internship => internship.id !== id)))
            })
            .catch(err => console.log(err.response.data.message))
    }

    return (
        <>
            <div className="h-screen overflow-y-auto">

                <div className="w-full min-h-screen lg:w-[98%] xl:w-[93%] px-0 sm:px-4 mx-auto flex flex-col gap-3 text-center py-[7rem] ">
                    <h3 className="font-bold my-2 text-4xl">{user?.role === "Admin" ? 'All Courses' : 'My Courses'}</h3>
                    <h3 className="font-bold text-2xl">
                        <p>Total Courses : {internships?.filter(stud => stud !== null).length || 0}</p>
                        {user?.role === "Admin" &&
                            <p>Students Enrolled : {students || 0}</p>
                        }
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 my-12 place-items-center">

                        {
                            internships?.map((data, index) => (
                                <Card key={index} data={data} route={user?.role === 'User' ? 'internship' : 'update'} deleteInternship={deleteInternship} />
                            ))
                        }

                    </div>

                </div>
                <Component />
                <Footer />
            </div>
        </>
    )
}

export default Profile
