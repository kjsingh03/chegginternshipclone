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
    axios.post(`${import.meta.env.VITE_API_KEY}/api/auth/logout`, { username: user?.username })
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
      <div className=" z-[1000] whitespace-nowrap flex items-center justify-between sm:justify-between px-0 pl-12 lg:px-2 text-sm fixed w-full bg-white shadow-md text-[#080808]">
        <div className="flex items-center justify-between gap-2 md:gap-3 sm:gap-5 relative">
          {
          <button id="navbar-toggler" className="block sm:hidden text-xl px-4 absolute left-[-3rem] z-[1500]"  >☰</button>
          }
          <div className="w-[7rem] ">
            <Link to="/"><img src={logo} alt="SkillsWallah Logo" className="block w-full h-full object-fill" /></Link>
            {/* <Link to="/"><img src={smallLogo} alt="SkillsWallah Logo" className="block sm:hidden w-full h-full object-fill" /></Link> */}
          </div>
          <ul className="flex items-center justify-between gap-3 sm:gap-5">


            <li className="hover:text-[#403f3f] hidden sm:block"><Link to="/">HOME</Link></li>
            {
              user?.role === 'Admin' &&
              <li className="hover:text-[#403f3f] hidden sm:block"><Link to="/add">ADD NEW</Link></li>
            }

            <li className="hover:text-[#403f3f] hidden lg:block"><Link to="/verify">CERTIFICATE VERIFICATION</Link></li>
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
            user?.role === 'Admin' &&
            <li className="hover:text-[#403f3f] hidden sm:block py-3"><Link to="/admin">ADMIN</Link></li>
          }
          {
            user &&
            <li className="hover:text-[#403f3f] block">
              <div className="dropdown">
                <div className="">
                  <div className="dropbtn flex items-center gap-2 py-3">
                    {!user?.imageUrl &&
                      <i className="fa-regular fa-circle-user text-xl"></i>
                    }
                    {user?.imageUrl &&
                      <img src={user?.imageUrl} className="w-8 rounded-[50%]" alt="" />
                    }
                    <p className="hidden xs:block">Welcome, {user?.name.split(" ")[0]}</p>
                    <i className="fa-solid fa-chevron-down"></i>
                  </div>
                  <div className="dropcontent min-w-min w-[94%] sm:w-full bg-white -translate-x-3.5 xs:translate-x-0.5">
                    <p><Link to="/profile">PROFILE</Link></p>
                    {
                      user &&
                      <p><Link to="/courses">{user?.role === "Admin" ? 'ALL COURSES' : 'MY COURSES'}</Link></p>
                    }
                    <p onClick={logout}>LOGOUT</p>
                  </div>
                </div>

              </div>
            </li>
          }

          {
            !user &&
            <li className="hover:text-[#403f3f] block py-3"><Link to="/login">LOG IN</Link></li>
          }
        </ul>
      </div>
      <div className="nav-sidebar translate-x-[-100%]  absolute z-[1000] w-screen flex h-screen overflow-y-auto">
        <div className="nav-list flex flex-col transition-all ease-in-out duration-300 gap-4 bg-white h-screen overflow-y-auto w-[15rem] text-sm p-4 font-medium">

          {/* <div className="w-[7rem] mx-8 py-3">
            <Link to="/"><img src={logo} alt="SkillsWallah Logo" className="block w-full h-full object-fill" /></Link>
          </div> */}

          <Link to="/profile" className="flex items-center gap-2 py-3">
            {!user?.imageUrl &&
              <i className="fa-solid fa-circle-user text-3xl"></i>
            }
            {user?.imageUrl &&
              <img src={user?.imageUrl} className=" w-12 rounded-[50%]" alt="" />
            }
            <div className="">
              <p>{user?.name}</p>
              <p className="text-xs">{user?.email}</p>
            </div>
          </Link>

          <p className=""><Link to="/">HOME</Link></p>
          {
            user?.role === 'Admin' &&
            <p><Link to="/admin">ADMIN DASHBOARD</Link></p>
          }

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
