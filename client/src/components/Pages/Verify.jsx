import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Verify() {

    const navigate = useNavigate()

    const [codeId, setCodeId] = useState({})
    const [certificates, setCertificates] = useState([])
    const [certificate, setCertificate] = useState({})

    const submit = () => {
        setCertificate(certificates.filter((cert) => cert.codeId === codeId)[0])

        setCertificate((prev) => {
            if(prev){
                axios.get(`http://localhost:8080/user/${prev?.user}`)
                    .then(res => {
                        document.getElementById("name").innerText = res.data.name
                        document.getElementById("username").innerText = res.data.username
                        document.getElementById("contact").innerText = res.data.contact
                        document.getElementById("college").innerText = res.data.college
                    }).catch(err => console.log(err))
            }
            else{
                document.getElementById("error").innerText = "Invalid codeID"
                setTimeout(()=> document.getElementById("error").innerText = "",500)
            }
        })
    }

    const verifyCertificate = () => {
        const id = document.querySelector("#codeId")?.value;

        const certificate = certificates.filter(cert => cert.codeId === id)[0];

        if (!certificate?.pdfDataUri) {
            document.getElementById("pdf").src = "";
            const err = document.getElementById("err");
            err.innerText = "Invalid code"
            console.log(err);
        }
        else {
            document.getElementById("err").innerText = ""
        }

    }
    useEffect(() => {
        axios.get("http://localhost:8080/internship")
            .then((res) => {
                for (let i in res.data.internships) {
                    for (let j in res.data.internships[i].certificates) {
                        setCertificates([...certificates, res.data.internships[i].certificates[j]])
                    }
                }
            })
            .catch((err) => console.log(err.response.data.message))
    }, [])


    return (
        <div>
            <Navbar />
            <div className='min-h-screen flex flex-col gap-6 w-[90%] sm:w-[50%] md:w-[40%] xl:w-[30%] mx-auto py-12 shadow-lg pt-[8rem]'>
                {/* <div className="flex items-center justify-between rounded-xl overflow-hidden px-3 py-2 bg-[#EB7100]">
                    <p onClick={setUserType} className="role active w-[50%] rounded-xl text-center py-1.5 font-medium cursor-pointer">User</p>
                    <p onClick={setUserType} className="role w-[50%] rounded-xl text-center py-1.5 font-medium cursor-pointer">Organisation</p>
                </div> */}
                <input type="text" name="username" onChange={e => setCodeId(e.target.value)} placeholder="Enter codeid" className='border-2 rounded-xl border-slate-300 outline-[#EB7100] p-3' />


                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-6 h-7">
                        <p className="w-[5rem]">Name</p>
                        <p className="w-6">:</p>
                        <p id="name"></p>
                    </div>
                    <div className="flex items-center gap-6 h-7">
                        <p className="w-[5rem]">Username</p>
                        <p className="w-6">:</p>
                        <p id="username"></p>
                    </div>
                    <div className="flex items-center gap-6 h-7">
                        <p className="w-[5rem]">Contact</p>
                        <p className="w-6">:</p>
                        <p id="contact"></p>
                    </div>
                    <div className="flex items-center gap-6 h-7">
                        <p className="w-[5rem]">College</p>
                        <p className="w-6">:</p>
                        <p id="college"></p>
                    </div>
                </div>

                <p className="text-red-500 font-medium h-6" id="error"></p>
                <div className="btn text-sm" onClick={submit}>Verify</div>
                <iframe id="pdf" height="200" width="300" src="" frameBorder="0"></iframe>

            </div>
        </div>
    )
}

export default Verify