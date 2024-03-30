import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import {  useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import logo from "../../assets/smallLogo.png";
import './components.css'
import _ from 'lodash'
import '../../App.css'
import Component from '../whatsapp/Component'
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../store/internshipslice';

function Internship() {

    const { id } = useParams()

    const dispatch=useDispatch()

    const navigate = useNavigate()

    const [internship, setInternship] = useState({})
    const [access, setAccess] = useState(false)
    const [promo, setPromo] = useState("")
    const [promocodes, setPromocodes] = useState([])
    const [price, setPrice] = useState(0)
    
    const user = JSON.parse(localStorage.getItem("credentials"))

    useEffect(() => {

        dispatch(setLoader(true))

        axios.get(`${import.meta.env.VITE_API_KEY}/api/internship/${id}`)
            .then(res => {
                setInternship(res.data.internship)
                setPrice(Math.floor(res.data.internship.price * (1 - res.data.internship.discount / 100)))
                for (let data in user?.internships) {
                    if (user?.internships[data] === res.data.internship?._id) {
                        setAccess(true)
                        break;
                    }
                }
                dispatch(setLoader(false))

            })
            .catch(err => console.log(err));

        axios.get(`${import.meta.env.VITE_API_KEY}/api/promocodes`)
            .then(res => setPromocodes(res.data.promocodes))
            .catch(err => console.log(err))

    }, [id])

    const handleClick = () => {
        if (user) {
            const promoSection = document.querySelector(".promosection")
            promoSection.style.display = "flex"
        }
        else {
            navigate('/login')
            setTimeout(() => document.getElementById("error").innerText = "Kindly Login First", 50)
            setTimeout(() => document.getElementById("error").innerText = "", 1150)
        }
    }

    const submit = () => {

        let isPromo = promocodes?.filter(promos => promos?.name === promo)[0]
        let usedPromo = user?.promocodes?.filter(promos => promos?.name === isPromo?.name)[0]

        if (isPromo) {

            if (!usedPromo) {
                document.getElementById("success").style.display = 'block'
                document.getElementById("error").style.display = 'none'
                document.getElementById("success").innerHTML = "Promocode applied successfully"
                setPrice(price => {
                    axios.post(`${import.meta.env.VITE_API_KEY}/api/pay`, {
                        amount: (price - isPromo?.value)*100 ,
                        currency: "INR",
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(res => {
                        var options = {
                            "key": import.meta.env.VITE_RAZORPAY_KEY,
                            "amount": (price- isPromo?.value)*100 ,
                            "currency": "INR",
                            "name": "SkillWallah Internship",
                            "description": "Test Transaction",
                            "image": logo,
                            "order_id": res.data.id,
                            "handler": (response) => {
                                axios.put(`${import.meta.env.VITE_API_KEY}/api/user`, { username: user?.username, internship: internship, promocodes: { name: promo, used: true } }, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(res => {
                                    localStorage.setItem("credentials", JSON.stringify(res.data.user))
                                    axios.put(`${import.meta.env.VITE_API_KEY}/api/internship/${id}`, { studentsEnrolled: user?.username }, {
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
                                "username": user?.username,
                                "contact": user?.contact
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
                    return (price-isPromo.value) ;
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
        axios.post(`${import.meta.env.VITE_API_KEY}/api/pay`, {
            amount: price * 100,
            currency: "INR",
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            var options = {
                "key": import.meta.env.VITE_RAZORPAY_KEY,
                "amount": price * 100,
                "currency": "INR",
                "name": "SkillWallah Internship",
                "description": "Test Transaction",
                "image": logo,
                "order_id": res.data.id,
                "handler": (response) => {
                    axios.put(`${import.meta.env.VITE_API_KEY}/api/user`, { username: user?.username, internship: internship, promocodes: { name: promo, used: true } }, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(res => {
                        localStorage.setItem("credentials", JSON.stringify(res.data.user))
                        axios.put(`${import.meta.env.VITE_API_KEY}/api/internship/${id}`, { studentsEnrolled: user?.username }, {
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
                    "username": user?.username,
                    "contact": user?.contact
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

    // console.log(lesson?.url)
    if (!access) {
        return (
            <>
                <div className="h-screen overflow-y-auto">

                    <div className="min-h-screen w-full lg:w-[90%] xl:w-[80%] p-10 mx-auto py-[5rem] sm:py-[8rem] flex flex-col gap-6 ">
                        <h3 className="text-lg font-bold">{internship.name}</h3>
                        <div className="flex md:flex-row flex-col w-full gap-6 md:items-center justify-between">
                            <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-calendar-days"></i>{internship.duration} Weeks </p>
                            {/* <p className='flex items-center gap-2'><i className="fa-solid fa-hourglass-end"></i> {internship.lastApplyDate?.split("T")[0].replace(/-/g, "/")}</p> */}
                        </div>
                        <h2 className="text-base font-bold">Skill(s) offered</h2>
                        <div className="flex sm:items-center gap-6 sm:gap-12 sm:flex-row flex-col">
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

                        <div onClick={handleClick} className="btn w-max py-2 text-base">Buy Now</div>

                        <div className="promosection hidden bg-black/40 items-center text-[black] text-lg justify-center absolute h-full top-0 left-0 z-[1001] w-full">
                            <div className="flex flex-col items-center gap-5 sm:w-[25rem] bg-white p-6 rounded-xl">
                                <i onClick={() => document.querySelector('.promosection').style.display = "none"} className="fa-solid fa-xmark w-full text-right"></i>
                                <input type="text" name="username" onChange={e => setPromo(e.target.value)} placeholder="Enter promocode" className='border-2 rounded-xl border-[#1B88F4] outline-[#1B88F4] p-4' />
                                <p className="text-base font-semibold h-3">Price : {price}</p>
                                <p className="text-red-500 text-[1rem] font-medium h-6" id="error"></p>
                                <p className="text-green-500 text-[1rem] font-medium h-6 hidden" id="success"></p>
                                <div className="flex gap-2">
                                    <div onClick={submit} className="btn w-max py-2 text-base ">Apply promo</div>
                                    <div onClick={payNow} className="btn w-max py-2 text-base ">Pay now</div>
                                </div>
                            </div>

                        </div>
                        {/* {
                            completed && user?.role === 'User' &&
                            <div className="">
                                <div onClick={getCertificate} className="btn w-max h-12">Get Certificate</div>
                            </div>
                        } */}
                    </div >

                    <Component />
                    <Footer />
                </div>
            </>
        )
    }
    else {
        navigate(`/internship/${id}/lesson1`)
    }

}

export default Internship
