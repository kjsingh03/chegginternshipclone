import React, { useEffect } from "react";
import logo from "../../assets/logo.png";
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
        navigate("/") 
        })
      .catch(err => console.log(err))
  }

  useEffect(()=>{

  },[user])

  return (
    <div className="flex items-center justify-center sm:justify-between px-6 py-2 border-b-4 border-[#EB7100] fixed w-full bg-white">
      <div className="flex items-center justify-between gap-3 sm:gap-5 py-3">
        <div className="w-[5rem] sm:w-[20rem] ">
          <Link to="/"><img src={logo} alt="Chegg" className="hidden sm:block w-full h-full object-fill" /></Link>
          <Link to="/"><img src={smallLogo} alt="Chegg" className="block sm:hidden w-full h-full object-fill" /></Link>
        </div>
        <ul className="flex items-center justify-between gap-3 sm:gap-5">
          {
            user?.role === 'User' &&
            <li className="hidden md:block">FREE SKILL PROGRAMS</li>
          }
          <li className="hidden md:block"><Link to="/">BROWSE</Link></li>
          <li><Link to={!user ? "/login" : "/profile"}>{!user ? 'SIGN IN' : 'PROFILE'}</Link></li>
          {
            user?.role === 'Organisation' &&
            <li><Link to="/add">ADD NEW</Link></li>
          }
          {
            user &&
            <li onClick={logout}>LOGOUT</li>
          }
        </ul>
      </div>
      <div className="border border-slate-300 p-3 rounded-xl hidden lg:block">
        <input type="search" className="bg-transparent outline-none" placeholder="Find Internships" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default Navbar;
