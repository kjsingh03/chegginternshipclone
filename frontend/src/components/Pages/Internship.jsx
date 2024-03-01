import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import logo from "../../assets/logo.png";

function Internship() {

    const { id } = useParams()

    const [internship, setInternship] = useState({})

    const user = JSON.parse(localStorage.getItem("credentials"))

    useEffect(() => {
        axios.get(`http://localhost:8080/internship/${id}`)
            .then(res => setInternship(res.data.internship))
            .catch(err => console.log(err))
    }, [])

    const handleClick = (price) => {
        axios.post("http://localhost:8080/pay", {
            amount: price*100,
            currency: "INR",
        },{
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res=>{
            var options = {
                "key": "rzp_test_dI2cMfs9QmKiFd", 
                "amount": price*100, 
                "currency": "INR",
                "name": "Chegg Internships",
                "description": "Test Transaction",
                "image": logo,
                "order_id": res.data.id, 
                "handler":  (response)=>{
                    console.log(response)
                    axios.put("http://localhost:8080/user", {username:user.username,internship:internship},{
                        headers:{
                            "Content-Type": "application/json"
                        }
                    }).then(res=>console.log(res.data.message))
                    .catch(err=>console.log(err))
                },
                "prefill": {
                    "username": user.username,
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.open()
            rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
        })
        .catch(err=>console.log(err))
    }

   

    return (
        <>
            <Navbar />
            <div className="w-[80%] p-10 mx-auto my-12 flex flex-col gap-6">
                <h3 className="text-lg font-bold">{internship.position}</h3>
                <h2 className="text-base font-bold">{internship.organisation}</h2>
                <div className="flex items-center justify-between">
                    <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-location-dot"></i> {internship.location} </p>
                    <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-money-bill"></i> {internship.stipend}/month </p>
                    <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-calendar-days"></i>{ internship.startTime===1?'1 Month':`1 - ${internship.startTime} Months`} </p>
                    <p className='flex items-center gap-2'><i className="fa-solid fa-hourglass-end"></i> {internship.lastApplyDate?.split("T")[0].replace(/-/g, "/")}</p>
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
                <p className='flex items-center gap-2'>{internship.price} </p>
                <div onClick={()=>handleClick(internship.price)} className="btn w-max h-12">Buy Now</div>
            </div >
        </>
    )
}

export default Internship
