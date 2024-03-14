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
    const navbg =

      toggler.addEventListener('click', () => {
        navbar.style.transform = navbar.style.transform === 'translateX(0)' ? 'translateX(-100%)' : 'translateX(0)';
        document.querySelector('.nav-list ~ div').addEventListener('click', (event) => {
          navbar.style.transform = 'translateX(-100%)'
        })
      })
    // })
  }, [])


  return (
    <>
      <div className=" z-[1000] whitespace-nowrap flex items-center justify-between sm:justify-between px-0 pl-12 lg:px-2 py-2 text-sm fixed w-full bg-white shadow-md text-[#080808]">
        <div className="flex items-center justify-between gap-2 md:gap-3 sm:gap-5 relative">
          <button id="navbar-toggler" className="block sm:hidden text-xl px-4 absolute left-[-3rem] z-[1500]"  >☰</button>
          <div className="w-[7rem] ">
            <Link to="/"><img src={logo} alt="SkillsWallah Logo" className="block w-full h-full object-fill" /></Link>
            {/* <Link to="/"><img src={smallLogo} alt="SkillsWallah Logo" className="block sm:hidden w-full h-full object-fill" /></Link> */}
          </div>
          <ul className="flex items-center justify-between gap-3 sm:gap-5">
           
            {
              user &&
              <li className="hover:text-[#403f3f] hidden sm:block"><Link to="/courses">{user.role === "Admin" ? 'COURSES' : 'MY COURSES'}</Link></li>
            }
            {
              user?.role === 'Admin' &&
              <li className="hover:text-[#403f3f] hidden sm:block"><Link to="/add">ADD NEW</Link></li>
            }

            <li className="hover:text-[#403f3f] hidden md:block"><Link to="/verify">CERTIFICATE VERIFICATION</Link></li>
            <li className="hover:text-[#403f3f] hidden lg:block"><Link to="/about">ABOUT US</Link></li>
          <li className="hover:text-[#403f3f] hidden lg:block"><Link to="/contact">CONTACT US</Link></li>
          </ul>
        </div>
        {/* <div className="border border-[#313131] p-3 rounded-xl hidden lg:block">
        <input type="search" className="bg-transparent outline-none" placeholder="Find Internships" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div> */}
        <ul className="flex items-center justify-between gap-3 sm:gap-5 px-7">
          {
            user &&
            <li className="hover:text-[#403f3f] block"><Link to="/profile">PROFILE</Link></li>
          }
          {
            user?.role==='Admin' &&
            <li className="hover:text-[#403f3f] block"><Link to="/admin">ADMIN</Link></li>
          }
          {
            user &&
            <li className="hover:text-[#403f3f] hidden sm:block" onClick={logout}>LOGOUT</li>
          }
          {
            !user &&
            <li className="hover:text-[#403f3f] block"><Link to="/login">LOG IN</Link></li>
          }
        </ul>
      </div>
      <div className="nav-sidebar translate-x-[-100%] absolute z-[1000] w-screen flex">
        <div className="nav-list flex flex-col gap-4 bg-white h-screen w-[15rem] text-sm p-4 font-medium">
          
        {/* <div className="w-[7rem] mx-8 py-3">
            <Link to="/"><img src={logo} alt="SkillsWallah Logo" className="block w-full h-full object-fill" /></Link>
          </div> */}

          <div className="flex items-center gap-2 py-3">
            <i className="fa-solid fa-user-circle text-3xl"></i>
            <div className="">
              <p>{user?.name}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          </div>

          <p className=""><Link to="/">HOME</Link></p>

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

          {
            user?.role === 'Admin' &&
            <p className=""><Link to="/add">ADD NEW</Link></p>
          }
          {
            user?.role === 'Admin' &&
            <p className=""><Link to="/courses">ALL COURSES</Link></p>
          }
          {
            user && user?.role !== 'Admin' &&
            <p className=""><Link to="/courses">MY COURSES</Link></p>
          }

          <p><Link to="/verify">CERTIFICATE VERIFICATION</Link></p>
          <p><Link to="/about">ABOUT US</Link></p>
          <p><Link to="/privacy">PRIVACY POLICY</Link></p>
          <p><Link to="/contact">CONTACT US</Link></p>
          <p><Link to="/refund">REFUND POLICY</Link></p>
          <p><Link to="/tnc">TERMS & CONDITIONS</Link></p>
          {
            user &&
            <p className="" onClick={logout}>LOGOUT</p>
          }
        </div>
        <div className="w-[calc(100vw-15rem)] bg-[#0000005b] h-screen"></div>
      </div>
    </>
  );
};

export default Navbar;
