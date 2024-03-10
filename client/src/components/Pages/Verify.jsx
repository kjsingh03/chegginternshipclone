import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Component from '../whatsapp/Component'

function Verify() {

    const navigate = useNavigate()

    const [codeId, setCodeId] = useState({})
    const [certificates, setCertificates] = useState([])
    const [certificate, setCertificate] = useState({})
    const [view, setView] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        setView(false)
        setCertificate(certificates?.filter((cert) => cert.codeId === codeId)[0])

        setCertificate((prev) => {
            console.log(prev)
            if (prev) {
                axios.get(`http://localhost:8080/user/${prev?.user}`)
                    .then(res => {
                        setView(true)
                        setTimeout(() => {
                            document.getElementById("name").innerText = res.data.name
                            document.getElementById("course").innerText = prev.courseName
                            document.getElementById("contact").innerText = res.data.contact
                            document.getElementById("college").innerText = res.data.college
                        }, 0)
                    }).catch(err => console.log(err))
            }
            else {
                document.getElementById("error").innerText = "Student not found"
                setTimeout(() => document.getElementById("error").innerText = "", 1000)
            }
        })
    }

    useEffect(() => {
        axios.get("http://localhost:8080/internship")
            .then((res) => {
                let internships = res.data.internships;

                for (let i in internships) {
                    let newCertificates = internships[i]?.certificates
                    for (let j in newCertificates) {
                        let newCert = newCertificates[j]
                        setCertificates((prev) => [...prev, newCert])
                    }
                }
            })
            .catch((err) => console.log(err.response.data.message))
    }, [])

    return (
        <div>
            <Navbar />
            <div className="w-full xl:w-[90%] min-h-[100vh] mx-auto text-center flex flex-col px-3 sm:px-0 gap-6 lg:gap-12 pt-[8rem]">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mx-auto">Verify Certificate</h1>
                <p className="text-sm lg:text-xl font-medium w-full sm:w-[90%] mx-auto">
                    Enter student's Code ID to verify the certificate
                </p>

                <div className="flex justify-center">
                    <input type="text" name="username" onChange={e => setCodeId(e.target.value)} placeholder="Enter codeid" className='hover:shadow-lg cursor-pointer  outline-[#1B88F4] p-4' />

                    <button className="btn rounded-none" onClick={submit}>Verify</button>
                </div>

                {
                    view &&
                    <div className="flex flex-col gap-3 justify-center text-left items-center">
                        <div className="flex items-center gap-2 h-7">
                            <p className="w-[5rem]">Name</p>
                            <p className="w-6">:</p>
                            <p id="name" className="w-[15rem]"></p>
                        </div>
                        <div className="flex items-center gap-2 h-7">
                            <p className="w-[5rem]">Course</p>
                            <p className="w-6">:</p>
                            <p id="course" className="w-[15rem]"></p>
                        </div>
                        <div className="flex items-center gap-2 h-7">
                            <p className="w-[5rem]">Contact</p>
                            <p className="w-6">:</p>
                            <p id="contact" className="w-[15rem]"></p>
                        </div>
                        <div className="flex items-center gap-2 h-7">
                            <p className="w-[5rem]">College</p>
                            <p className="w-6">:</p>
                            <p id="college" className="w-[15rem]"></p>
                        </div>
                    </div>

                }

                <p className="text-red-500 font-medium h-6" id="error"></p>


            </div>
            <Component/>
            <Footer/>
        </div>
    )
}

export default Verify
