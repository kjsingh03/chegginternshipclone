import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import logo from "../../assets/smallLogo.png";
import { PDFDocument, rgb } from 'pdf-lib'
import pdf from './cert.pdf'
import font from './Sanchez-Regular.ttf'
import fontkit from '@pdf-lib/fontkit'
import './components.css'

function Internship() {

    const { id } = useParams()

    const navigate = useNavigate()

    const [internship, setInternship] = useState({})
    const [access, setAccess] = useState(false)
    const [generated, setGenerated] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [promo, setPromo] = useState("")
    const [promocodes, setPromocodes] = useState([])
    const [price, setPrice] = useState(0)
    const [lesson, setLesson] = useState({})
    const [assignment, setAssignment] = useState([])

    const user = JSON.parse(localStorage.getItem("credentials"))

    useEffect(() => {
        axios.get(`http://localhost:8080/internship/${id}`)
            .then(res => {
                setInternship(res.data.internship)
                setLesson(res.data.internship.lessons[0])
                setPrice(Math.floor(res.data.internship.price * (1 - res.data.internship.discount / 100)))
                setGenerated(user?.certificates.filter(certificate => certificate?.internship === res.data.internship._id)[0])
                for (let data in user?.internships) {
                    if (user?.internships[data] === res.data.internship?._id) {
                        setAccess(true)
                        break;
                    }
                }
            })
            .catch(err => console.log(err));

        axios.get("http://localhost:8080/promocodes")
            .then(res => setPromocodes(res.data.promocodes))
            .catch(err => console.log(err))
    }, [setGenerated])


    const handleClick = () => {
        const promoSection = document.querySelector(".promosection")
        promoSection.style.display = "flex"
    }

    const submit = () => {

        let isPromo = promocodes?.filter(promos => promos?.name === promo)[0]
        let usedPromo = user?.promocodes?.filter(promos => promos?.name === isPromo?.name)[0]

        if (isPromo) {

            if (!usedPromo) {
                document.querySelector("#error").innerHTML = "Promocode applied successfully"
                setPrice(price => {
                    // console.log('payment done')
                    axios.post("http://localhost:8080/pay", {
                        amount: price * (1 - isPromo.value / 100) * 100,
                        currency: "INR",
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(res => {
                        var options = {
                            "key": "rzp_test_dI2cMfs9QmKiFd",
                            "amount": price * (1 - isPromo.value / 100) * 100,
                            "currency": "INR",
                            "name": "SkillsWallah Internships",
                            "description": "Test Transaction",
                            "image": logo,
                            "order_id": res.data.id,
                            "handler": (response) => {
                                axios.put("http://localhost:8080/user", { username: user.username, internship: internship, promocodes: { name: promo, used: true } }, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(res => {
                                    localStorage.setItem("credentials", JSON.stringify(res.data.user))
                                    axios.put(`http://localhost:8080/internship/${id}`, { studentsEnrolled: user?.username }, {
                                        headers: {
                                            "Authorization": user?.token,
                                            "Content-Type": "application/json"
                                        }
                                    }).then(() => navigate("/courses"))
                                        .catch(err => console.log(err))
                                })
                                    .catch(err => console.log(err))
                            },
                            "prefill": {
                                "username": user.username,
                            }
                        };
                        var rzp1 = new Razorpay(options);
                        rzp1.open()
                        rzp1.on('payment.failed', function (response) {
                            alert(response.error.code);
                            alert(response.error.description);
                            alert(response.error.source);
                            alert(response.error.step);
                            alert(response.error.reason);
                            alert(response.error.metadata.order_id);
                            alert(response.error.metadata.payment_id);
                        });
                    })
                        .catch(err => console.log(err))
                    return price * (1 - isPromo.value / 100);
                })
            }

            else {
                document.querySelector("#error").innerHTML = "Promocode already used"
            }
        }

        else {
            document.querySelector("#error").innerHTML = "Promocode not found"
        }

        setTimeout(() => document.querySelector("#error").innerHTML = "", 1000)
    }

    const payNow = () => {
        axios.post("http://localhost:8080/pay", {
            amount: price * 100,
            currency: "INR",
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            var options = {
                "key": "rzp_test_dI2cMfs9QmKiFd",
                "amount": price * 100,
                "currency": "INR",
                "name": "SkillsWallah Internships",
                "description": "Test Transaction",
                "image": logo,
                "order_id": res.data.id,
                "handler": (response) => {
                    axios.put("http://localhost:8080/user", { username: user.username, internship: internship, promocodes: { name: promo, used: true } }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(res => {
                        localStorage.setItem("credentials", JSON.stringify(res.data.user))
                        axios.put(`http://localhost:8080/internship/${id}`, { studentsEnrolled: user?.username }, {
                            headers: {
                                "Authorization": user?.token,
                                "Content-Type": "application/json"
                            }
                        }).then(() => navigate("/courses"))
                            .catch(err => console.log(err))
                    })
                        .catch(err => console.log(err))
                },
                "prefill": {
                    "username": user.username,
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open()
            rzp1.on('payment.failed', function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
        })
            .catch(err => console.log(err))
    }

    const getCertificate = () => {
        const userName = user?.name;

        let codeId = ""

        const { PDFDocument, rgb, degrees } = PDFLib;

        const capitalize = (str, lower = false) =>
            (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
                match.toUpperCase()
            );

        const val = capitalize(userName);

        const generatePDF = async (name) => {
            const existingPdfBytes = await fetch(pdf).then((res) =>
                res.arrayBuffer()
            ).catch(err => console.log(err));

            // Load a PDFDocument from the existing PDF bytes
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            pdfDoc.registerFontkit(fontkit);

            //get font
            const fontBytes = await fetch(font).then((res) =>
                res.arrayBuffer()
            );

            // Embed our custom font in the document
            const SanChezFont = await pdfDoc.embedFont(fontBytes);

            // Get the first page of the document
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            // Draw a string of text diagonally across the first page
            firstPage.drawText(name, {
                x: 310,
                y: 300,
                size: 30,
                font: SanChezFont,
                color: rgb(0.96, 0.85, 0.17),
            });

            firstPage.drawText(`For outstanding completion of ${internship.name} `, {
                x: 225,
                y: 265,
                size: 20,
                font: SanChezFont,
                color: rgb(0.04, 0.08, 0.3),
            });
            firstPage.drawText(`internship program at Techma Technologies. `, {
                x: 205,
                y: 240,
                size: 20,
                font: SanChezFont,
                color: rgb(0.04, 0.08, 0.3),
            });

            const string = "abcdefghijklmnopqrstuvwxyz0123456789";
            codeId = "";

            for (let i = 0; i < 8; i++) {
                codeId += string[Math.floor(Math.random() * string.length)];
            }

            firstPage.drawText(`codeid : ${codeId}`, {
                x: 650,
                y: 80,
                size: 10,
                font: SanChezFont,
                color: rgb(0, 0, 0),
            });

            // Serialize the PDFDocument to bytes (a Uint8Array)
            const pdfBytes = await pdfDoc.save();

            // this was for creating uri and showing in iframe

            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

            axios.put(`http://localhost:8080/internship/${internship.id}`, { certificates: { user: user?.username, codeId: codeId } }, {
                headers: {
                    "Authorization": user?.token,
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    axios.put(`http://localhost:8080/user`, { username: user?.username, certificates: { internship: internship?._id, generated: true, codeId: codeId } }, {
                        headers: {
                            "Authorization": user?.token,
                            "Content-Type": "application/json"
                        }
                    })
                        .then((response) => {
                            console.log(response.data)
                            setGenerated(true)
                            localStorage.setItem("credentials", JSON.stringify(response.data.user))
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })

            var file = new File(
                [pdfBytes],
                "Certificate_Verification.pdf",
                {
                    type: "application/pdf;charset=utf-8",
                }
            );
            saveAs(file);

        };

        //check if the text is empty or not
        if (val.trim() !== "") {
            // console.log(val);
            generatePDF(val);
        } else {
            console.log("error")
        }
    }

    if (!access) {
        return (
            <>
                <Navbar />
                <div className="w-full lg:w-[90%] xl:w-[80%] p-10 mx-auto py-[8rem] flex flex-col gap-6 ">
                    <h3 className="text-lg font-bold">{internship.name}</h3>
                    <div className="flex md:flex-row flex-col w-full gap-6 md:items-center justify-between">
                        <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-calendar-days"></i>{internship.duration} Weeks </p>
                        {/* <p className='flex items-center gap-2'><i className="fa-solid fa-hourglass-end"></i> {internship.lastApplyDate?.split("T")[0].replace(/-/g, "/")}</p> */}
                    </div>
                    <h2 className="text-base font-bold">Skill(s) required</h2>
                    <div className="flex items-center gap-12">
                        {internship?.skills?.map((skill, index) => (
                            <p key={index} className='flex items-center gap-2'>{skill} </p>
                        ))}
                    </div>
                    <h2 className="text-base font-bold">Perks</h2>
                    <div className="flex items-center gap-12">
                        {internship?.perks?.map((perk, index) => (
                            <p key={index} className='flex items-center gap-2'>{perk} </p>
                        ))}
                    </div>
                    <h2 className="text-base font-bold">Price</h2>
                    <p className='flex items-center gap-2'>{price} </p>
                    {
                        user.role === 'User' &&
                        <div onClick={handleClick} className="btn w-max h-12">Buy Now</div>
                    }
                    <div className="promosection hidden bg-black/5 items-center text-white text-lg justify-center absolute h-full top-0 left-0 z-40 w-full">
                        <div className="flex flex-col items-center gap-5 w-[25rem] bg-[#272626] p-6 rounded-xl">
                            <i onClick={() => document.querySelector('.promosection').style.display = "none"} className="fa-solid fa-xmark w-full text-right"></i>
                            <input type="text" name="username" onChange={e => setPromo(e.target.value)} placeholder="Enter promocode" className='border-2 rounded-xl border-[#313131] outline-[#313131] p-4' />
                            <p className=" text-base font-medium h-6">Price : {price}</p>
                            <p className="text-red-500 text-sm font-medium h-6" id="error"></p>
                            <div className="flex gap-2">
                                <div onClick={submit} className="btn w-max h-12">Apply promo</div>
                                <div onClick={payNow} className="btn w-max h-12">Pay now</div>
                            </div>
                        </div>

                    </div>
                    {
                        completed && user.role === 'User' &&
                        <div className="">
                            <div onClick={getCertificate} className="btn w-max h-12">Get Certificate</div>
                        </div>
                    }
                </div >
            </>
        )
    }
    else {
        return (
            <>
                <Navbar />
                <div className="sidebar" id="sidebar">
                    <ul className="sidebar-menu">
                        <li className="menu-item"><div >Lesson</div></li>
                        {
                            internship?.lessons.map((lesson, index) => (
                                <li className="menu-item" key={index}><Link><div onClick={() => { setLesson(lesson); setAssignment({}) }}><span><i className="fa-solid fa-graduation-cap"></i> Lesson {index + 1}</span><i className="fa-solid fa-chevron-right"></i></div></Link></li>
                            ))
                        }

                        <li className="menu-item"><div to={`/assignment/${id}`}>Assignment</div></li>
                        <li className="menu-item" onClick={() => { setLesson({}); setAssignment(internship?.questions) }}><Link><span><i className="fa-solid fa-chalkboard-user"></i> Assignment</span><i
                            className="fa-solid fa-chevron-right"></i>
                        </Link></li>
                        {
                            completed && 
                        <li className="menu-item"><div to={`/assignment/${id}`}>Certificate</div></li>
                        }
                        {
                            completed && <li className="menu-item" onClick={() => {setLesson({});setAssignment({})}}><Link><span><i className="fa-solid fa-chalkboard-user"></i> Get Certificate</span><i
                            className="fa-solid fa-chevron-right"></i>
                        </Link></li>
    }


                    </ul>
                </div>
                <div className="ml-[18rem] pt-[6rem]">
                    {
                        lesson &&
                        <div className='flex flex-col gap-6'>
                            <h4 className='text-2xl'>{lesson.lesson}</h4>
                            <iframe width="560" height="315" style={{ display: lesson.lesson ? 'block' : 'none' }} src={`https://www.youtube.com/embed/${lesson?.url}?si=2g_0geZbXlguYOu8&amp;controls=0`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            <h4>{lesson.description}</h4>
                        </div>
                    }
                    {
                        assignment.length > 0 &&
                        <div className="flex flex-col gap-5">
                            {assignment.map((data, index) => (
                                <div className="flex flex-col gap-5" key={index}>
                                    <h1 className="text-xl">{data.question}</h1>
                                    <div className="grid grid-cols-2 gap-4">
                                        <p>{data.options[0].option}</p>
                                        <p>{data.options[1].option}</p>
                                        <p>{data.options[2].option}</p>
                                        <p>{data.options[3].option}</p>
                                    </div>
                                </div>
                            ))}
                            <button onClick={() => {setCompleted(true); setAssignment({})}} className='btn w-max text-sm'>Complete</button>
                        </div>
                    }
                    {
                        completed && 
                        <div className="">
                            <button onClick={getCertificate} className="btn">Get certificate</button>
                        </div>
                    }
                </div>

            </>
        )
    }

}

export default Internship
