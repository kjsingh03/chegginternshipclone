import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

function AdminPanel() {

    const user = JSON.parse(localStorage.getItem('credentials'))

    // const [user, setUser] = useState({})
    const [promocodes, setPromocodes] = useState([])
    const [users, setUsers] = useState([])

    let newPromocodes = [...promocodes]

    useEffect(() => {
        let newUser = JSON.parse(localStorage.getItem('credentials'))?.username

        axios.get("http://localhost:8080/promocodes")
            .then(res => setPromocodes(res.data.promocodes))
            .catch(err => console.log(err))

        axios.get("http://localhost:8080/user/all")
            .then(res => setUsers(res.data.splice(1)))
            .catch(err => console.log(err))

    }, [])

    const submit = () => {
        if (user?.role === 'Admin') {

            axios.put(`http://localhost:8080/user`, { ...user, promocodes }, {
                headers: {
                    "Authorization": user?.token,
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    document.getElementById("error").innerText = res.data.message;
                })
                .catch((err) => {
                    document.getElementById("error").innerText = err.response.data.message
                })
                .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
        }
    }



    // user?.internships?.map((intern, index) => {
    //     console.log(intern.name)
    // })


    return (
        <div>
            <Navbar />
            <div className="h-screen overflow-y-auto">

            <div className="min-h-screen flex flex-col gap-8 w-[90%] md:w-[85%] xl:w-[70%] mx-auto py-12 shadow-lg pt-[8rem]">

                <div className="">
                    <h3 className="font-bold my-2 text-3xl sm:text-4xl">Promocodes</h3>

                    <div className="flex items-baseline gap-8 justify-between sm:justify-normal">

                        <div className="grid grid-cols-1 w-full gap-6">

                            {
                                promocodes.map((count, index) => (
                                    <div className="flex sm:items-center sm:flex-row flex-col gap-4 md:gap-6 lg:gap-8" key={index}>
                                        <input value={newPromocodes[index].name || ""} type="text" name="name" onChange={e => { newPromocodes[index].name = e.target.value; setPromocodes([...newPromocodes]) }} placeholder="Enter Promo Name" className='w-[11rem] md:w-auto border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                        <input value={newPromocodes[index].value || 0} type="number" name="value" onChange={e => { newPromocodes[index].value = e.target.value; setPromocodes([...newPromocodes]) }} placeholder="Enter Promo Value" className='w-[11rem] md:w-auto border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                    </div>
                                ))
                            }
                        </div>



                        <div className=" text-xs cursor-pointer gap-4 sm:gap-8 lg:gap-4 flex lg:flex-row flex-col justify-end">

                            <p onClick={() => setPromocodes((prev) => [...prev, { name: "", value: 0 }])} className='w-[9rem] text-center border border-gray-600 p-3 rounded-xl'>add promocode</p>

                            {
                                promocodes?.length > 1 &&
                                <p onClick={() => setPromocodes((prev) => prev.slice(0, -1))} className='w-[9rem] text-center border border-gray-600 p-3 rounded-xl'>remove promocode</p>
                            }
                        </div>
                    </div>

                </div>

                <div className="">
                    <h3 className="font-bold my-2 text-3xl sm:text-4xl">Users</h3>

                    <div className="flex items-baseline gap-8 justify-between sm:justify-normal">

                        <div className="grid grid-cols-1 w-full gap-6">

                            {
                                users?.map((data, index1) => (
                                    <div className="flex items-start gap-5" key={index1}>

                                        <div className="text-xl font-semibold py-4">
                                            {index1 + 1}
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                                            <input value={data.name || ""} type="text" name="name" placeholder="Enter Promo Name" onChange={e => e.target.value} className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                            <input value={data.username || ""} type="text" name="username" onChange={e => e.target.value} className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                            <input value={data.contact || ""} type="text" name="contact" onChange={e => e.target.value} className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                            <input value={data.email || ""} type="email" name="email" onChange={e => e.target.value} className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                            {
                                                data?.internships?.length>0 && 
                                            <div className="flex justify-between items-center w-full col-span-4">
                                                <p className='font-semibold w-[25%]'>Courses Enrolled : </p>
                                                <div className="grid grid-cols-3 w-full col-span-3 gap-6">

                                                    {
                                                        data?.internships?.map((intern, index2) => (
                                                            <input value={intern.name || ""} type="text" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                            }
                                            </div>
                                    </div>
                                ))
                            }
                        </div>




                    </div>

                </div>

                <p className="text-red-500 font-medium h-6" id="error"></p>

                <div className="btn text-sm cursor-pointer" onClick={submit}>Update </div>

            </div>
            <Footer />
            </div>
        </div>
    )
}

export default AdminPanel
