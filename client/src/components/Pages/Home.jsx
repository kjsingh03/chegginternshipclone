import React, { useEffect, useRef, useState } from 'react';
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import logo from "../../assets/SkillwallahLogo.jpg";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Card from '../Cards/Card';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { updateInternships } from '../../store/internshipslice';
import thumb1 from '../../assets/1.png'
import thumb2 from '../../assets/2.png'
import thumb3 from '../../assets/3.png'
import thumb4 from '../../assets/4.png'
import thumb5 from '../../assets/5.png'
import thumb6 from '../../assets/6.png'
import thumb7 from '../../assets/7.png'
import Footer from '../Footer/Footer';

const Home = () => {

  const internships = useSelector(state => state.internships)

  const user = JSON.parse(localStorage.getItem("credentials"))?.username

  const dispatch = useDispatch()

  const sortDateAsc = () => {
    dispatch(updateInternships(_.sortBy(internships, ['price'], ['asc'])))
  }

  const sortDateDesc = () => {
    dispatch(updateInternships(_.orderBy(internships, ['price'], ['desc'])))
  }

  const sortPriorityAsc = () => {
    dispatch(updateInternships(_.sortBy(internships, ['discount'], ['asc'])))
  }

  const sortPriorityDesc = () => {
    dispatch(updateInternships(_.orderBy(internships, ['discount'], ['desc'])))
  }



  return (
    <>
      <Navbar />
      <div className='flex flex-col gap-4 max-h-screen overflow-y-auto'>
        <div className="pt-[3.25rem] w-full mx-auto ">
          <Swiper
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-navigation-size": "15px",
            }}
            spaceBetween={30}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            // loop={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper xs:h-[] sm:h-[] md:h-[80vh] xl:h-[92.5vh]"
          >
            <SwiperSlide>
              <img src={thumb1} className="w-full h-full object-bottom" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={thumb2} className="w-full h-full object-bottom" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={thumb3} className="w-full h-full object-bottom" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={thumb4} className="w-full h-full object-bottom" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={thumb5} className="w-full h-full object-bottom" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={thumb6} className="w-full h-full object-bottom" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={thumb7} className="w-full h-full object-bottom" />
            </SwiperSlide>
          </Swiper>

        </div>

        <div className="w-full xl:w-[90%] mx-auto text-center flex flex-col gap-12 py-[4rem] xl:pt-[8rem] ">
          <h1 className="text-2xl lg:text-4xl font-bold w-[70%] mx-auto">Real-world skills to land your dream job or internship</h1>
          <p className="text-base lg:text-xl font-medium w-[90%] mx-auto">
            Build the real-world skills you need to stand out to employers hiring
            for entry-level roles with SkillsWallah Skills
          </p>

          {
            !user &&
            <Link to="/login"><button className="btn">Get started</button></Link>
          }
        </div>

        <div className="w-full lg:w-[95%] xl:w-[90%] px-0 sm:px-8 md:px-0 mx-auto flex flex-col gap-4 sm:gap-10">
          <div className="flex justify-between items-center px-4">
            <h2 className="text-base xs:text-2xl sm:text-3xl font-bold sm:px-12 xl:px-0  ">Featured skill programs</h2>
            <div className="dropdown z-[50] flex items-center gap-4 md:gap-8 border-[1.6px] border-[#c4c3c3] rounded-xl py-[0.375rem] px-4 md:px-2 md:py-1 cursor-pointer">
              <div className="">
                <div className="dropbtn">Sort</div>
                <div className="dropcontent">
                  <p onClick={sortDateAsc}><span>Price</span> <i className="fa-solid fa-arrow-down"></i></p>
                  <p onClick={sortDateDesc}><span>Price</span> <i className="fa-solid fa-arrow-up"></i></p>
                  <p onClick={sortPriorityAsc}><span>Discount</span> <i className="fa-solid fa-arrow-up"></i></p>
                  <p onClick={sortPriorityDesc}><span>Discount</span> <i className="fa-solid fa-arrow-down"></i></p>
                </div>
              </div>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <Swiper
            spaceBetween={0}
            breakpoints={{
              0: {
                slidesPerView: 1,
                grabCursor: true,
                centeredSlides: true
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 0
              },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper w-[95%] xs:w-[80%] sm:w-[95%] mx-auto internship-swiper"
          >
            {
              internships?.map((data, index) => (
                <SwiperSlide key={index}>
                  <Card data={data} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <div className="w-full lg:w-[95%] xl:w-[90%]  px-0 sm:px-8 md:px-0 mx-auto flex flex-col gap-4 sm:gap-10">
          <div className="flex justify-between">
            <h2 className="text-base xs:text-xl sm:text-3xl font-bold px-4 sm:px-12 xl:px-0  ">Computer Science / IT</h2>

          </div>
          <Swiper
            spaceBetween={30}
            breakpoints={{
              0: {
                slidesPerView: 1,
                grabCursor: true,
                centeredSlides: true
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              900: {
                slidesPerView: 3
              },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            // loop={true}
            // navigation={true}
            modules={[Autoplay]}
            className="mySwiper w-[95%] xs:w-[80%] sm:w-[95%] mx-auto internship-swiper"
          >
            {
              internships?.filter(data => data.branch === 'Computer').map((data, index) => (
                <SwiperSlide key={index}>
                  <Card data={data} />
                </SwiperSlide>

              ))
            }
          </Swiper>
        </div>
        <div className="w-full lg:w-[95%] xl:w-[90%]  px-0 sm:px-8 md:px-0 mx-auto flex flex-col gap-4 sm:gap-10">
          <div className="flex justify-between">
            <h2 className="text-base xs:text-xl sm:text-3xl font-bold px-4 sm:px-12 xl:px-0  ">Electronics Department</h2>

          </div>
          <Swiper
            spaceBetween={30}
            breakpoints={{
              0: {
                slidesPerView: 1,
                grabCursor: true,
                centeredSlides: true
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              900: {
                slidesPerView: 3
              },
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper w-[95%] xs:w-[80%] sm:w-[95%] mx-auto internship-swiper"
          >
            {
              internships?.filter(data => data.branch === 'Electronics').map((data, index) => (
                <SwiperSlide key={index}>
                  <Card data={data} />
                </SwiperSlide>

              ))
            }
          </Swiper>
        </div>



        <Footer />
      </div>
    </>
  );
};

export default Home;
