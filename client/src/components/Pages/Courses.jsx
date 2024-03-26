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

    }, [])

    console.log(internships)

    return (
        <>
            <Navbar />
            <div className="h-screen overflow-y-auto">

                <div className="w-[95%] min-h-screen lg:w-[90%] xl:w-[80%] px-0 sm:px-16 mx-auto flex flex-col gap-3 text-center py-[7rem] ">
                    <h3 className="font-bold my-2 text-4xl">{user?.role === "Admin" ? 'All Courses' : 'My Courses'}</h3>
                    <h3 className="font-bold text-2xl">
                        <p>Total Courses : {internships?.filter(stud => stud !== null).length || 0}</p>
                        {user?.role === "Admin" &&
                            <p>Students Enrolled : {students || 0}</p>
                        }
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 my-12">

                        {
                            internships?.map((data, index) => (
                                <Card key={index} data={data} route={user?.role === 'User' ? 'internship' : 'update'} />
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
