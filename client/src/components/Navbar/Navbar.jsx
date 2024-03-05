import React, { useEffect } from "react";
import logo from "../../assets/logo-nobg.png";
import smallLogo from "../../assets/smallLogo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {

  let user = JSON.parse(localStorage.getItem("credentials"))

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

  }, [user])

  return (
    <div className="z-[1000] flex items-center justify-center sm:justify-between px-2 py-2 border-b-2  border-[#313131] fixed w-full bg-[#1F1F1F]">
      <div className="flex items-center justify-between gap-3 sm:gap-5 ">
        <div className="w-[4rem] sm:w-[15rem] ">
          <Link to="/"><img src={logo} alt="SkillsWallah Logo" className="hidden sm:block w-full h-full object-fill" /></Link>
          <Link to="/"><img src={smallLogo} alt="SkillsWallah Logo" className="block sm:hidden w-full h-full object-fill" /></Link>
        </div>
        <ul className="flex items-center justify-between gap-3 sm:gap-5">
          <li className="hidden md:block"><Link to="/">BROWSE</Link></li>

          {
            user &&
            <li><Link to="/courses">{!user?.role === "Admin" ? 'COURSES' : 'MY COURSES'}</Link></li>
          }
          {
            user?.role === 'Admin' &&
            <li><Link to="/add">ADD NEW</Link></li>
          }

          <li><Link to="/verify">CERTIFICATE VERIFICATION</Link></li>
        </ul>
      </div>
      {/* <div className="border border-[#313131] p-3 rounded-xl hidden lg:block">
        <input type="search" className="bg-transparent outline-none" placeholder="Find Internships" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div> */}
      <ul className="flex items-center justify-between gap-3 sm:gap-5 px-7">
        <li><Link to="/profile">PROFILE</Link></li>
        {
          user?.role === 'Admin' &&
          <li><Link to="/add">ADD NEW</Link></li>
        }
        {
          user &&
          <li onClick={logout}>LOGOUT</li>
        }
        {
          !user &&
          <li ><Link to="/login">SIGNIN</Link></li>
        }
      </ul>
    </div>
  );
};

export default Navbar;
