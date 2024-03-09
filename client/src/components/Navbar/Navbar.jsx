import React, { useEffect } from "react";
import logo from "../../assets/SkillwallahLogo.png";
import smallLogo from "../../assets/smallLogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Navbar = () => {

  let user = JSON.parse(localStorage.getItem("credentials"))

  const internships = useSelector(state => state.internships)

  const navigate = useNavigate()

  const logout = () => {
    axios.post("http://localhost:8080/auth/logout", { username: user.username })
      .then(() => {
        localStorage.removeItem('credentials')
        user = {}
        navigate("/login")
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    // document.addEventListener('DOMContentLoaded', function () {
      const toggler = document.getElementById('navbar-toggler')
      const navbar = document.querySelector('.nav-sidebar')
      const navList = document.querySelector('.nav-list')

      toggler.addEventListener('click', () => {
        console.log('click')
        navbar.style.display = 'flex'
        setTimeout(() => {
          document.addEventListener('click', (event) => {
            if (!navList.contains(event.target)) {
              navbar.style.display = 'none'
            }
          })
          document.removeEventListener('click',()=>{console.log('remove')})
        }, 0)
      })
    // })
    }, [])


  return (
    <>
      <div className="z-[1000] whitespace-nowrap flex items-center justify-between sm:justify-between px-2 py-2 text-sm fixed w-full bg-white shadow-md text-[#080808]">
        <div className="flex items-center justify-between gap-2 md:gap-3 sm:gap-5 ">
          <button id="navbar-toggler" className="block sm:hidden text-xl px-4"  >☰</button>
          <div className="w-[7rem] ">
            <Link to="/"><img src={logo} alt="SkillsWallah Logo" className="block w-full h-full object-fill" /></Link>
            {/* <Link to="/"><img src={smallLogo} alt="SkillsWallah Logo" className="block sm:hidden w-full h-full object-fill" /></Link> */}
          </div>
          <ul className="flex items-center justify-between gap-3 sm:gap-5">
            <li className="hidden sm:block"><Link to="/">HOME</Link></li>

            {
              user &&
              <li className="hidden sm:block"><Link to="/courses">{!user.role === "Admin" ? 'COURSES' : 'MY COURSES'}</Link></li>
            }
            {
              user?.role === 'Admin' &&
              <li className="hidden sm:block"><Link to="/add">ADD NEW</Link></li>
            }

            <li className="hidden sm:block"><Link to="/verify">CERTIFICATE VERIFICATION</Link></li>
          </ul>
        </div>
        {/* <div className="border border-[#313131] p-3 rounded-xl hidden lg:block">
        <input type="search" className="bg-transparent outline-none" placeholder="Find Internships" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div> */}
        <ul className="flex items-center justify-between gap-3 sm:gap-5 px-7">
          {
            user &&
            <li className="block"><Link to="/profile">PROFILE</Link></li>
          }
          {
            user &&
            <li className="hidden sm:block" onClick={logout}>LOGOUT</li>
          }
          {
            !user &&
            <li className="block"><Link to="/login">SIGNIN</Link></li>
          }
        </ul>
      </div>
      <div className="hidden nav-sidebar sm:hidden flex-col absolute z-[1000] w-screen bg-[#0000005b]">
        <div className="nav-list flex flex-col gap-4 bg-white h-screen w-[15rem] text-sm p-4 font-medium">
          <div className="">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
          <p className=""><Link to="/">HOME</Link></p>

          {
            user &&
            <div onClick={() => document.querySelector('.nav-courses').style.display = document.querySelector('.nav-courses').style.display === 'flex' ? 'none' : 'flex'}>
              <p className=""> COURSES <i className="fa-solid fa-chevron-down"></i></p>
              <div className="hidden nav-courses flex-col gap-4 p-4">
                {
                  internships?.map((data, index) => (
                    <p key={index}><Link to={`/internship/${data.id}`}>{data.name}</Link></p>
                  ))
                }
              </div>
            </div>
          }
          {
            user?.role === 'Admin' &&
            <p className=""><Link to="/add">ADD NEW</Link></p>
          }

          <p className=""><Link to="/verify">CERTIFICATE VERIFICATION</Link></p>
          {
            user &&
            <li className="hidden sm:block" onClick={logout}>LOGOUT</li>
          }
        </div>
      </div>
    </>
  );
};

export default Navbar;
