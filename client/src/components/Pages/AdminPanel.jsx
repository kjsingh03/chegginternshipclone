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

        axios.get(`${import.meta.env.VITE_API_KEY}/api/promocodes`)
            .then(res => setPromocodes(res.data.promocodes))
            .catch(err => console.log(err))

        axios.get(`${import.meta.env.VITE_API_KEY}/api/user/all`)
            .then(res => setUsers(res.data.splice(1)))
            .catch(err => console.log(err))

    }, [])

    const submit = () => {
        if (user?.role === 'Admin') {

            axios.put(`${import.meta.env.VITE_API_KEY}/api/user`, { ...user, promocodes }, {
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

                <div className="min-h-screen flex flex-col gap-8 w-[90%] md:w-[85%] xl:w-[70%] mx-auto py-12 pt-[7rem]">

                    <div className="">
                        <div className="flex sm:flex-row flex-col items-baseline sm:gap-8 justify-between sm:justify-normal">
                            <h3 className="font-bold text-3xl sm:text-4xl my-6">Promocodes</h3>
                            <div className="w-full text-xs cursor-pointer gap-4 lg:gap-4 flex pb-6 sm:justify-end">
                                <p onClick={() => setPromocodes((prev) => [...prev, { name: "", value: 0 }])} className='w-[10rem] text-center border border-gray-600 p-3 rounded-xl'>add promocode</p>
                                {
                                    promocodes?.length > 1 &&
                                    <p onClick={() => setPromocodes((prev) => prev.slice(0, -1))} className='w-[10rem] text-center border border-gray-600 p-3 rounded-xl'>remove promocode</p>
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-1 w-full gap-6">

                            {
                                promocodes.map((count, index) => (
                                    <div className="flex sm:items-center gap-4 md:gap-6 lg:gap-8" key={index}>
                                        <input value={newPromocodes[index].name || ""} type="text" name="name" onChange={e => { newPromocodes[index].name = e.target.value; setPromocodes([...newPromocodes]) }} placeholder="Enter Promo Name" className='w-[50%] md:w-auto border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                        <input value={newPromocodes[index].value || 0} type="number" name="value" onChange={e => { newPromocodes[index].value = e.target.value; setPromocodes([...newPromocodes]) }} placeholder="Enter Promo Value" className='w-[50%] md:w-auto border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                    {/* <div className="">
                        <div className="flex sm:flex-row flex-col items-baseline sm:gap-8 justify-between sm:justify-normal">
                            <h3 className="font-bold text-3xl sm:text-4xl my-6">Thumbnail</h3>
                            <div className="w-full text-xs cursor-pointer gap-4 lg:gap-4 flex pb-6 sm:justify-end">
                                <p onClick={() => setPromocodes((prev) => [...prev, { name: "", value: 0 }])} className='w-[10rem] text-center border border-gray-600 p-3 rounded-xl'>add promocode</p>
                                {
                                    promocodes?.length > 1 &&
                                    <p onClick={() => setPromocodes((prev) => prev.slice(0, -1))} className='w-[10rem] text-center border border-gray-600 p-3 rounded-xl'>remove promocode</p>
                                }
                            </div>
                        </div>
                        <div className="grid grid-cols-2 w-full gap-6">

                            {
                                user?.thumbnails?.map((thumbnail, index) => (
                                    <div className="cursor-pointer hover:bg-slate-500 relative " key={index}>
                                        <img src={thumbnail} className='w-full h-[12rem]' alt="" />
                                        <div className="gap-6">
                                            <p className='absolute right-0 top-0 btn text-xs py-1 px-2 w-max h-max'><i className="fa-solid fa-xmark"></i></p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div> */}

                    <p className="text-red-500 font-medium h-6" id="error"></p>

                    <div className="btn text-sm cursor-pointer" onClick={submit}>Update </div>

                    <div className="">
                        <h3 className="font-bold my-6 text-3xl sm:text-4xl">Users</h3>

                        <div className="flex items-baseline gap-8 justify-between sm:justify-normal">

                            <div className="grid grid-cols-1 w-full gap-6">

                                {
                                    users?.map((data, index1) => (
                                        <div className="flex items-start gap-5" key={index1}>

                                            <div className="text-xl font-semibold py-4">
                                                {index1 + 1}
                                            </div>

                                            <div className="grid grid-cols-1 xm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full">
                                                <input value={data.name || ""} type="text" name="name" placeholder="Enter Promo Name" onChange={e => e.target.value} className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                                <input value={data.username || ""} type="text" name="username" onChange={e => e.target.value} className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                                <input value={data.contact || ""} type="text" name="contact" onChange={e => e.target.value} className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                                <input value={data.email || ""} type="email" name="email" onChange={e => e.target.value} className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                                {
                                                    data?.internships?.length > 0 &&
                                                    <div className="gap-3 lg:gap-16 flex flex-col xm:flex-row justify-between lg:items-center w-full xm:col-span-2 lg:col-span-4">
                                                        <p className='font-semibold w-full py-2 lg:w-[25%]'>Courses Enrolled : </p>
                                                        <div className="grid grid-cols-1 lg:grid-cols-3 w-full lg:col-span-3 gap-8">

                                                            {
                                                                data?.internships?.map((intern, index2) => (
                                                                    <input value={intern.name || ""} readOnly key={index2} type="text" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                }
                                                {
                                                    data?.promocodes?.filter(promo => promo.name !== "")?.length > 0 &&
                                                    <div className="gap-3 lg:gap-16 flex flex-col xm:flex-row justify-between items-center w-full xm:col-span-2 lg:col-span-4">
                                                        <p className='font-semibold w-full py-2 lg:w-[25%]'>Promocode used : </p>
                                                        <div className="grid grid-cols-1 lg:grid-cols-3 w-full lg:col-span-3 gap-8">

                                                            {
                                                                data?.promocodes?.filter(promo => promo.name !== "")?.map((promocode, index2) => (
                                                                    <input value={promocode.name || ""} readOnly key={index2} type="text" className='w-full border-2 rounded-xl  outline-[#1B88F4] p-3' />
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



                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AdminPanel
