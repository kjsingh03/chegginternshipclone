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
import _ from 'lodash'

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
    const [test, setTest] = useState([])
    const [points, setPoints] = useState(0)
    const [activeOptions, setActiveOptions] = useState([])
    const [disabled, setDisabled] = useState(true)

    let newActiveOptions = [...activeOptions]

    const user = JSON.parse(localStorage.getItem("credentials"))

    const userCertificate = user?.certificates?.filter(data => data?.internship === internship?._id)[0]

    useEffect(() => {
        axios.get(`http://localhost:8080/internship/${id}`)
            .then(res => {
                setInternship(res.data.internship)
                setLesson(res.data.internship.lessons[0])
                // setTest(res.data.internship.questions)
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


    }, [])

    useEffect(() => {
        if (userCertificate)
            setDisabled(false)
    }, [internship])

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

            if (userCertificate) {
                firstPage.drawText(name, {
                    x: 315,
                    y: 374,
                    size: 30,
                    font: SanChezFont,
                    color: rgb(0.121, 0.337, 0.517),
                });
                firstPage.drawText(`${userCertificate?.duration}`, {
                    x: 421,
                    y: 315,
                    size: 16,
                    font: SanChezFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(`${userCertificate?.name}`, {
                    x: 540,
                    y: 287,
                    size: 16,
                    font: SanChezFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(`${userCertificate.percentage}%`, {
                    x: 634,
                    y: 257,
                    size: 16,
                    font: SanChezFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(`${userCertificate?.codeId}`, {
                    x: 678,
                    y: 105,
                    size: 16,
                    font: SanChezFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(`${userCertificate?.date.split("T")[0].replace(/-/g, "/")}`, {
                    x: 672,
                    y: 85,
                    size: 14,
                    font: SanChezFont,
                    color: rgb(0, 0, 0),
                });
            }
            else{
                const string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                codeId = "";

                for (let i = 0; i < 8; i++) {
                    codeId += string[Math.floor(Math.random() * string.length)];
                }

                firstPage.drawText(name, {
                    x: 315,
                    y: 374,
                    size: 30,
                    font: SanChezFont,
                    color: rgb(0.121, 0.337, 0.517),
                });
                firstPage.drawText(`${internship.duration}`, {
                    x: 421,
                    y: 315,
                    size: 16,
                    font: SanChezFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(`${internship.name}`, {
                    x: 540,
                    y: 287,
                    size: 16,
                    font: SanChezFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(`${points / 15 * 100}%`, {
                    x: 634,
                    y: 257,
                    size: 16,
                    font: SanChezFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(`${codeId}`, {
                    x: 678,
                    y: 105,
                    size: 16,
                    font: SanChezFont,
                    color: rgb(0, 0, 0),
                });
                firstPage.drawText(`${new Date().toJSON().slice(0, 10).replace(/-/g, '/')}`, {
                    x: 672,
                    y: 85,
                    size: 14,
                    font: SanChezFont,
                    color: rgb(0, 0, 0),
                });

                axios.put(`http://localhost:8080/internship/${internship.id}`, { certificates: { user: user?.username, codeId: codeId ,courseName:internship.name} }, {
                    headers: {
                        "Authorization": user?.token,
                        "Content-Type": "application/json"
                    }
                })
                    .then((res) => {
                        axios.put(`http://localhost:8080/user`, { username: user?.username, certificates: { internship: internship?._id, generated: true, codeId: codeId, percentage: points, name: internship.name, duration: internship.duration, date: new Date().toJSON().slice(0, 10) } }, {
                            headers: {
                                "Authorization": user?.token,
                                "Content-Type": "application/json"
                            }
                        })
                            .then((response) => {
                                setGenerated(true)
                                localStorage.setItem("credentials", JSON.stringify(response.data.user))
                            })
                            .catch((err) => console.log(err))
                    })
                    .catch((err) => console.log(err))
            }


            // Serialize the PDFDocument to bytes (a Uint8Array)
            const pdfBytes = await pdfDoc.save();

            // this was for creating uri and showing in iframe

            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });


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
            generatePDF(val);

        } else {
            console.log("error")
        }
    }

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

    const selectOption = (index, option) => {

        newActiveOptions[index] = option
        setActiveOptions([...newActiveOptions])
    }

    const submitQuiz = () => {
        let newPoints = 0;
        activeOptions.forEach((option, index) => {

            if (test[index].options[activeOptions[index]]?.correct)
                newPoints += 1
        })
        setPoints(newPoints)
        if (newPoints >= 1) {
            setCompleted(true)
            setDisabled(false)
            setTest({});
        }
        else {
            document.getElementById("error").innerText = "Marks less than 75% try again"
            console.log(document.getElementById("error"))
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
                    <h2 className="text-base font-bold">Skill(s) offered</h2>
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
                            <input type="text" name="username" onChange={e => setPromo(e.target.value)} placeholder="Enter promocode" className='border-2 rounded-xl border-[#1B88F4] outline-[#1B88F4] p-4' />
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

                <button onClick={activateSidebar} id="sidebar-toggler" className="absolute block lg:hidden text-xl py-[0.71rem] px-4 z-[2000]"  >☰</button>
                <div className="flex">

                    <div className="sidebar px-3 lg:shadow-none shadow-xl" id="sidebar">
                        <ul className="sidebar-menu">
                            <li className="menu-item"><div >Lesson</div></li>
                            {
                                internship?.lessons.map((lesson, index) => (
                                    <li className="menu-item" key={index}><Link><div onClick={() => { setLesson(lesson); setTest({}); setCompleted(false) }}><span><i className="fa-solid fa-graduation-cap"></i> Lesson {index + 1}</span></div><i className="fa-solid fa-chevron-right"></i></Link></li>
                                ))
                            }

                            <li className="menu-item"><div to={`/assignment/${id}`}>Test</div></li>
                            <li className="menu-item" onClick={() => { setLesson({}); setTest(internship?.questions); setCompleted(false); }}><Link><span><i className="fa-solid fa-chalkboard-user"></i> Test</span><i
                                className="fa-solid fa-chevron-right"></i>
                            </Link></li>
                            {

                                <li className="menu-item"><div to={`/assignment/${id}`}>Certificate</div></li>
                            }
                            {
                                <li className="menu-item" onClick={() => { setLesson({}); setTest({}); setCompleted(true); }}><Link><span><i className="fa-solid fa-chalkboard-user"></i> Get Certificate</span><i
                                    className="fa-solid fa-chevron-right"></i>
                                </Link></li>
                            }


                        </ul>
                    </div>

                    <div className="black fixed translate-x-[-100%] right-0 w-[calc(100vw)] z-[900] bg-[#0000005b] h-screen"></div>

                </div>
                <div className="w-full md:w-[80%] lg:w-auto mx-auto lg:ml-[18rem] pt-[6rem]">
                    {
                        lesson &&
                        <div className='flex flex-col gap-6 items-center md:items-start text-center md:text-left'>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{lesson.lesson}</h1>
                            <div style={{ display: lesson.lesson ? 'block' : 'none' }} className="md:w-[40rem] md:h-[21rem] sm:w-[26rem] sm:h-[14rem] ">
                                <iframe style={{ display: lesson.lesson ? 'block' : 'none', width: '100%', height: '100%' }} src={`https://www.youtube.com/embed/${lesson?.url}?si=2g_0geZbXlguYOu8&amp;controls=0`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>
                            <p className="text-sm lg:text-lg font-medium w-full">{lesson.description}</p>
                        </div>
                    }
                    {
                        test?.length > 0 &&
                        <div className="flex flex-col gap-5 px-8 text-sm">
                            {test?.map((data, index) => (
                                <div className="testQuestion flex flex-col gap-5" key={index}>
                                    <h1 className="text-xl">{data.question}</h1>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <p onClick={() => selectOption(index, 0)} className='border border-[#1B88F4] p-2 rounded-xl'>1. {data.options[0].option}</p>
                                        <p onClick={() => selectOption(index, 1)} className='border border-[#1B88F4] p-2 rounded-xl'>2. {data.options[1].option}</p>
                                        <p onClick={() => selectOption(index, 2)} className='border border-[#1B88F4] p-2 rounded-xl'>3. {data.options[2].option}</p>
                                        <p onClick={() => selectOption(index, 3)} className='border border-[#1B88F4] p-2 rounded-xl'>4. {data.options[3].option}</p>
                                    </div>
                                </div>
                            ))}
                            <p className="text-red-500 h-6" id="error"></p>
                            <button onClick={() => submitQuiz()} className='btn w-max text-sm'>Complete</button>
                        </div>
                    }
                    {
                        completed &&
                        <div className="getCertificate">
                            <button onClick={() => { if (disabled) { document.getElementById('error').innerText="Kindly complete test first" ; setTimeout(()=>document.getElementById('error').innerText="",1000) } else { getCertificate() } }} className="btn">Get certificate</button>
                            <p className="text-red-500 h-6 py-4 font-medium" id="error"></p>
                        </div>
                    }
                </div>

            </>
        )
    }

}

export default Internship
