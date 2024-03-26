import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'

function Profile() {

  const [user, setUser] = useState({})
  const [promocodes, setPromocodes] = useState([])
  const [users, setUsers] = useState([])
  const [image, setImage] = useState("")

  let newPromocodes = [...promocodes]

  const navigate = useNavigate()

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('credentials'))

    if (user) {
      setUser(user)
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
    if (image) {
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
      data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

      axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, data)
        .then(res => {
          document.querySelectorAll(".userDp").src = res.data.secure_url        
          document.querySelector(".dpButton").style.display = 'none'
          axios.put(`${import.meta.env.VITE_API_KEY}/api/user`, { ...user, imageUrl: res.data.secure_url }, {
            headers: {
              "Authorization": user?.token,
              "Content-Type": "application/json"
            }
          })
            .then((response) => {
              document.getElementById("error").innerText = response.data.message;
              localStorage.setItem('credentials', JSON.stringify({ ...user, imageUrl: res.data.secure_url }))
            })
            .catch((err) => {
              document.getElementById("error").innerText = err.response.data.message
            })
            .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
        })
        .catch(err => console.log(err))
    }
    else {
      axios.put(`${import.meta.env.VITE_API_KEY}/api/user`, { ...user }, {
        headers: {
          "Authorization": user?.token,
          "Content-Type": "application/json"
        }
      })
        .then((response) => {
          document.getElementById("error").innerText = response.data.message;
          localStorage.setItem('credentials', JSON.stringify(user))
        })
        .catch((err) => {
          document.getElementById("error").innerText = err.response.data.message
        })
        .finally(() => setTimeout(() => document.getElementById("error").innerText = " ", 1000))
    }
  }



  return (
    <div>
      <Navbar />
      <div className="h-screen overflow-y-auto">
        <div className="min-h-screen flex flex-col gap-8 w-[90%] md:w-[85%] xl:w-[70%] mx-auto py-12 pt-[8rem]">
          <div className="flex justify-between items-center h-[4.25rem]">
            <h3 className="font-bold my-2 text-3xl sm:text-4xl">User Details</h3>
            <div className="">
              {!user?.imageUrl &&
                <label htmlFor="dpFile" className='relative dpButton btn text-base rounded-[50%] px-4 py-3.5 text-[#1B88F4] bg-transparent border-2 border-[#1B88F4]'>
                  <i className="fa-regular fa-user"></i>
                  <i className="fa-regular fa-plus absolute bottom-0 bg-white"></i>
                  <input id="dpFile" type="file" onChange={e => setImage(e.target.files[0])} className='w-[15rem] hidden' />
                </label>
              }
              
                <img src={user?.imageUrl} alt="" className='userDp w-[4rem] rounded-[50%]' />

            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <input type="text" value={user?.name || ""} name="name" readOnly placeholder="Enter Name" className='w-full border-2 rounded-xl outline-[#1B88F4] p-3' />
            <input type="text" value={user?.username || ""} name="username" readOnly placeholder="Enter username" className='w-full border-2 rounded-xl outline-[#1B88F4] p-3' />
            <input type="email" value={user?.email || ""} name="email" onChange={handleChange} placeholder="Enter Email" className='w-full border-2 rounded-xl outline-[#1B88F4] p-3' />
            <input type="number" value={user?.contact || ""} name="contact" onChange={handleChange} placeholder="Enter Contact" className='w-full border-2 rounded-xl outline-[#1B88F4] p-3' />
            <input type="text" value={user?.college || ""} name="college" onChange={handleChange} placeholder="Enter College Name" className='w-full border-2 rounded-xl outline-[#1B88F4] p-3' />
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
