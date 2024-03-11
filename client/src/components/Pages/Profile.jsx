import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'

function Profile() {

  const [user, setUser] = useState({})
  const [promocodes, setPromocodes] = useState([])
  const [users, setUsers] = useState([])

  let newPromocodes = [...promocodes]

  const navigate = useNavigate()

  useEffect(() => {
    let newUser = JSON.parse(localStorage.getItem('credentials'))?.username

    if (newUser) {
      axios.get(`http://localhost:8080/user/${newUser}`)
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }
    else {
      document.getElementById('error').innerText = "Kindly Login"
      navigate("/login")
    }

  }, [])

  const handleChange = (e) => {
    setUser({ ...user, [`${e.target.name}`]: e.target.value })
  }

  const submit = () => {

    axios.put(`http://localhost:8080/user`, { ...user }, {
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






  return (
    <div>
      <Navbar />
      <div className="h-screen overflow-y-auto">
        <div className="min-h-screen flex flex-col gap-8 w-[90%] md:w-[85%] xl:w-[70%] mx-auto py-12 shadow-lg pt-[8rem]">
          <h3 className="font-bold my-2 text-3xl sm:text-4xl">User Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <input type="text" value={user.name || ""} name="name" readOnly placeholder="Enter Name" className='w-full border-2 rounded-xl outline-[#1B88F4] p-3' />
            <input type="text" value={user.username || ""} name="username" readOnly placeholder="Enter username" className='w-full border-2 rounded-xl outline-[#1B88F4] p-3' />
            <input type="email" value={user.email || ""} name="email" onChange={handleChange} placeholder="Enter Email" className='w-full border-2 rounded-xl outline-[#1B88F4] p-3' />
            <input type="number" value={user.contact || ""} name="contact" onChange={handleChange} placeholder="Enter Contact" className='w-full border-2 rounded-xl outline-[#1B88F4] p-3' />
            <input type="text" value={user.college || ""} name="college" onChange={handleChange} placeholder="Enter College Name" className='w-full border-2 rounded-xl outline-[#1B88F4] p-3' />
          </div>


          <p className="text-red-500 font-medium h-6" id="error"></p>

          <div className="btn text-sm cursor-pointer z-10" onClick={submit}>Update </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Profile
