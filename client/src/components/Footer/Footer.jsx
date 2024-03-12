import React from 'react'
import logo from "../../assets/SkillwallahLogo-white.png";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="bg-[#111B21] text-[#e7e7e7] lg:px-6 transition-all ease-in-out duration-300 z-[1000]">
      <div className="w-full lg:w-[80%] xl:w-[70%] mx-auto">

        <div className="grid sm:grid-cols-2 place-items-center sm:place-items-stretch md:flex gap-2 md:justify-between sm:text-base py-[3rem] sm:py-[4rem] border-b border-b-white px-2 sm:px-6 lg:px-0">
          <div className="flex col-span-3 flex-col justify-around items-center px-3 gap-4 sm:px-12 md:px-0">
            <div className="w-[18rem] pb-8">
              <img src={logo} alt="SkillsWallah Internships" className="w-full h-full object-fill" />
            </div>
            <button className='install-btn btn text-sm text-[#ffffff] bg-transparent border-2 border-[#ffffff] mb-12'>Download</button>
          </div>
          <div className="">
            
            <ul className='list-none text-xs sm:text-[0.9rem] md:text-[1.1rem] flex flex-col gap-7'>
              <li className="hover:text-[#1B88F4] "><Link to="/">Home</Link></li>
              <li className="hover:text-[#1B88F4] "><Link to="/courses">Courses</Link></li>
              <li className="hover:text-[#1B88F4] "><Link to="/verify">Verification</Link></li>
            </ul>
          </div>
          <div className="">
            
            <ul className='list-none text-xs sm:text-[0.9rem] md:text-[1.1rem] flex flex-col gap-7'>
              <li className="hover:text-[#1B88F4] "><Link to="/about">About Us</Link></li>
              <li className="hover:text-[#1B88F4] "><Link to="/privacy">Privacy Policy</Link></li>
              <li className="hover:text-[#1B88F4] "><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="">
            
            <ul className='list-none text-xs sm:text-[0.9rem] md:text-[1.1rem] flex flex-col gap-7'>
              <li className="hover:text-[#1B88F4] "><Link to="/tnc">Terms of use</Link></li>
              <li className="hover:text-[#1B88F4] "><Link to="/refund">Refund Policy</Link></li>
              <li className="hover:text-[#1B88F4] "><Link to="/tnc">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col gap-5 items-center justify-between py-4 px-6 lg:px-0">
          <p>2024 © SkillWallah LLC</p>
          <div className="flex items-center gap-6 justify-between">
            <i className="border border-white hover:border-[#1B88F4] hover:text-[#1B88F4] py-2.5 px-5 cursor-pointer text-lg rounded-[50%] fa-brands fa-facebook-f"></i>
            <i className="border border-white hover:border-[#1B88F4] hover:text-[#1B88F4] py-2.5 px-4 cursor-pointer text-xl rounded-[50%] fa-brands fa-linkedin-in"></i>
            {/* <i className="border border-white hover:border-[#1B88F4] hover:text-[#1B88F4] py-2.5 px-4 cursor-pointer text-xl rounded-[50%] fa-brands fa-github"></i> */}
            <i className="border border-white hover:border-[#1B88F4] hover:text-[#1B88F4] py-2.5 px-4 cursor-pointer text-xl rounded-[50%] fa-brands fa-whatsapp"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
