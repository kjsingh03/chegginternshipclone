import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function Sidebar() {

    const { id, route } = useParams()

    const [internship, setInternship] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8080/internship/${id}`)
            .then(res => {
                setInternship(res.data.internship)
            })
            .catch(err => console.log(err))
    }, [id])

    const activateSidebar = () => {
        const toggler = document.getElementById('sidebar-toggler')
        const sidebar = document.querySelector('.sidebar')

        if (sidebar.classList.contains('active'))
            sidebar.classList.remove('active')
        else
            sidebar.classList.add('active')

        document.querySelector('.sidebar ~ .black').addEventListener('click', () => {
            sidebar.classList.remove('active')
        })

    }

    return (
        <>
            <button onClick={activateSidebar} id="sidebar-toggler" className="absolute block lg:hidden text-xl py-[0.71rem] px-4 z-[2000]"  >☰</button>

            <div className="flex">

                <div className="sidebar px-3 lg:shadow-none shadow-xl" id="sidebar">
                    <ul className="sidebar-menu">
                        {
                            internship?.lessons?.length > 0 &&
                            <li className="menu-item"><div >Lesson</div></li>
                        }
                        {
                            internship?.lessons?.map((lesson, index) => (
                                <li className="menu-item" key={index}><Link to={`/internship/${id}/lesson${index + 1}`}><div><span><i className="fa-solid fa-graduation-cap"></i> Lesson {index + 1}</span></div><i className="fa-solid fa-chevron-right"></i></Link></li>
                            ))
                        }
                        {
                            internship?.questions?.length > 0 &&
                            <div className="">
                                <li className="menu-item"><div >Test</div></li>
                                <li className="menu-item"><Link to={`/internship/${id}/${'test'}`}><span><i className="fa-solid fa-chalkboard-user"></i> Test</span><i className="fa-solid fa-chevron-right"></i> </Link></li>
                            </div>
                        }
                        <li className="menu-item"><div>Certificate</div></li>
                        <li className="menu-item"><Link to={`/internship/${id}/${'certificate'}`}><span><i className="fa-solid fa-chalkboard-user"></i> Get Certificate</span><i className="fa-solid fa-chevron-right"></i></Link></li>
                        {
                            internship?.assignmentTask &&
                            <div className="">
                                <li className="menu-item"><div>Assignment</div></li>
                                <li className="menu-item"><Link to={`/internship/${id}/${'assignment'}`}><span><i className="fa-solid fa-chalkboard-user"></i> Assignment</span><i className="fa-solid fa-chevron-right"></i></Link></li>
                            </div>
                        }
                    </ul>
                </div>

                <div className="black fixed translate-x-[-100%] right-0 w-[calc(100vw)] z-[900] bg-[#0000005b] h-screen"></div>

            </div>
        </>
    )
}

export default Sidebar
