import React from 'react'
import logo from "../../assets/SkillwallahLogo.png";

function Footer() {
  return (
    <div className="bg-[#212731] text-[#c2c2c2]">
       <div className="flex gap-2 flex-col py-10 px-12 md:px-[8rem]">
        <div className="w-[15rem]">
          <img src={logo} alt="SkillsWallah Internships" className="w-full h-full object-fill" />
        </div>
        <p>SkillsWallah Internships is a service provided by SkillsWallah, Inc. 2023
          SkillsWallah, Inc. All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
