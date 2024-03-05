import React from "react";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import logo from "../../assets/logo-nobg.png";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Cards from "../Cards/Cards";

const Home = () => {

  return (
    <>
      <Navbar />
      <div className="w-full xl:w-[90%] mx-auto text-center py-12 flex flex-col gap-12 pt-[8rem] ">
        <h1 className="text-2xl lg:text-4xl font-bold w-[70%] mx-auto">Real-world skills to land your dream job or internship</h1>
        <p className="text-base lg:text-xl font-medium w-[90%] mx-auto">
          Build the real-world skills you need to stand out to employers hiring
          for entry-level roles with SkillsWallah Skills
        </p>
        <Link to="/login"><button className="btn">Get started</button></Link>
      </div>

      <div id="">
        <Cards />
      </div>
      
      {/* <div className="flex justify-between items-center flex-col md:flex-row gap-10 w-[80%] mx-auto ">
        <div className="w-[20rem] sm:w-[30rem]">
          <img className="w-full h-full object-fill" src={img1} alt="img1" />
        </div>
        <div className="hidden md:block w-[25rem] md:w-[30rem]">
          <img className="w-full h-full object-fill" src={img2} alt="img2" />
        </div>
      </div> */}

      <div className="w-full lg:w-[80%] px-12 mx-auto">
        <h2 className="text-2xl font-bold my-6">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-5 sm:p-6 bg-[#1F1F1F] rounded-xl">
            <div className="text-[#FEC84B] ">★★★★★</div>
            <div className="">
              “Learning how Excel is used for projects big and small at real
              companies helped me gain a better understanding of what's going to
              be expected of me when I get my first job.”
            </div>
            <div className="flex items-center gap-6">
              <div
                className="thumbnail"
                style={{
                  backgroundImage:
                    "url('https://tse1.mm.bing.net/th?id=OIP.25iSkbJTm4F-Rq0g1JR8NgHaHa&pid=Api&P=0&h=180')",
                }}
              ></div>
              <div className="">
                <h6 className="font-bold">Lauren K.</h6>
                <p>Rutgers University '24</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 sm:p-6 bg-[#1F1F1F] rounded-xl">
            <div className="text-[#FEC84B] ">★★★★★</div>
            <div className="">
              “Learning more about my dream job while learning a new skill was
              so helpful. I loved that each module was only an hour because I
              could find time to squeeze it into my schedule.”
            </div>
            <div className="flex items-center gap-6">
              <div
                className="thumbnail"
                style={{
                  backgroundImage:
                    "url('https://tse1.mm.bing.net/th?id=OIP.25iSkbJTm4F-Rq0g1JR8NgHaHa&pid=Api&P=0&h=180')",
                }}
              ></div>
              <div className="">
                <h6 className="font-bold">Stephanie C.</h6>
                <p>NC State University '24</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 sm:p-6 bg-[#1F1F1F] rounded-xl">
            <div className="text-[#FEC84B] ">★★★★★</div>
            <div className="">
              “I've learned two new skills this month and have felt so much more
              confident on interview calls because of these . I've heard
              back from most of the jobs I've submitted my resume to.”
            </div>
            <div className="flex items-center gap-6">
              <div
                className="thumbnail"
                style={{
                  backgroundImage:
                    "url('https://tse1.mm.bing.net/th?id=OIP.25iSkbJTm4F-Rq0g1JR8NgHaHa&pid=Api&P=0&h=180')",
                }}
              ></div>
              <div className="">
                <h6 className="font-bold">Blake J.</h6>
                <p>University of Michigan '25</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}

      <div className="hidden md:flex flex-col md:flex-row w-full gap-12 lg:w-[80%] px-12 mx-auto my-9 py-6 border-t border-[#EAECF0]">
        <div className="w-full md:w-[25%] px-10 flex flex-col gap-3 border-r border-[#EAECF0]">
          <h4 className="text-sm font-bold">Your Next Internship</h4>
          <div className="text-sm">
            <p>Create Your Profile</p>
            <p>Browse Internships</p>
            <p>Resource Center</p>
            <p>Discover Your Options</p>
            <p>Get the Job</p>
          </div>
        </div>

        <div className="w-full md:w-[25%] px-10 flex flex-col gap-3 border-r border-[#EAECF0]">
          <h4 className="text-sm font-bold">Resume</h4>
          <div className="text-sm">
            <p>Resume 101</p>
            <p>Resume Samples</p>
          </div>

          <h4 className="text-sm font-bold">Cover Letter</h4>
          <div>
            <p>Cover Letter 101</p>
            <p>Cover Letter Samples</p>
          </div>

          <h4 className="text-sm font-bold">Effective Interviewing</h4>
          <div>
            <p>Interview Tips</p>
            <p>Internship Interview Questions</p>
            <p>Interview Follow-Up</p>
          </div>
        </div>

        <div className="w-full md:w-[25%] px-10 flex flex-col gap-3 border-r border-[#EAECF0]">
          <h4 className="text-sm font-bold">Employers</h4>
          <div className="text-sm">
            <p>Post an Internship or Job (for Free)</p>
            <p>Employer Resources</p>
            <p>Setting Up an Internship Program</p>
            <p>Help Center</p>
          </div>
        </div>

        <div className="w-full md:w-[25%] px-10 flex flex-col gap-3">
          <h4 className="text-sm font-bold">Legal</h4>
          <div className="text-sm">
            <p>Terms (Updated)</p>
            <p>Privacy Policy</p>
            <p>Intellectual Property Rights</p>
            <p>DO NOT SELL MY INFO</p>
            <p>Cookie Notice</p>
          </div>

          <h4 className="text-sm font-bold">Customer Service</h4>
          <div>
            <p>Contact Us</p>
            <p>Trust and Safety Center</p>
            <p>About</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-col py-10 px-12 md:px-[8rem]">
        <div className="w-[15rem]">
          <img src={logo} alt="SkillsWallah Internships" className="w-full h-full object-fill" />
        </div>
        <p>SkillsWallah Internships is a service provided by SkillsWallah, Inc. 2023
          SkillsWallah, Inc. All Rights Reserved</p>
      </div>
    </>
  );
};

export default Home;
