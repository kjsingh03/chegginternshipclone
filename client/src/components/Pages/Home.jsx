import React, { useEffect, useRef, useState } from 'react';
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
import Footer from '../Footer/Footer';
import Component from '../whatsapp/Component';
import axios from 'axios';

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

  const thumbnails = useSelector(state => state.thumbnails)

  return (
    <>
      <div className="h-screen overflow-y-auto">

        <div className='flex flex-col gap-4 max-h-screen overflow-y-auto'>
          
            <div className="w-full mx-auto lg:gap-12 pt-[3.25rem]">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#000",
                  "--swiper-navigation-size": "15px",
                }}
                spaceBetween={30}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: true,
                }}
                speed={1200}
                // loop={true}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper md:h-[41rem]"
              >
                {
                  thumbnails?.map((thumb, index) => (
                    <SwiperSlide key={index}>
                      <img src={thumb} className="w-full h-full object-bottom" />
                    </SwiperSlide>
                  ))
                }

              </Swiper>
            </div>
          

          <div className="w-full xl:w-[90%] mx-auto text-center flex flex-col px-3 sm:px-0 gap-6 lg:gap-12 pt-[3.75rem]">
            <h1 className="text-base xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mx-auto">Courses that Transform, Learning that Lasts.</h1>
            <p className="text-sm lg:text-xl font-medium w-full sm:w-[90%] mx-auto">
              Crafting Excellence with Skillwallah: Your Journey Begins Now.
            </p>

            {
              !user &&
              <Link to="/login"><button className="btn">Get started</button></Link>
            }
          </div>



          <div className="internship-section flex flex-col gap-4 sm:gap-10 py-12">
            <div className="w-full lg:w-[95%] xl:w-[90%] px-0 sm:px-8 md:px-0 mx-auto flex flex-col gap-4 sm:gap-6">

              <div className="flex justify-between items-center px-6 sm:px-4">
                <h2 className="text-base xs:text-2xl sm:text-3xl font-bold py-6 xs:px- sm:px-0  ">Featured skill programs</h2>
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
                    centeredSlides: true,
                    autoplay: {
                      delay: 4000
                    },
                    speed: 800,
                    spaceBetween: 120,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 80,
                  },
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 60
                  },
                }}
                autoplay={{
                  delay: 2750,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Autoplay]}
                className="mySwiper w-[80%] sm:w-[63%] md:w-[95%] lg:w-[85%] xl:w-[95%] mx-auto h-[27rem] internship-swiper"
              >
                {
                  internships?.map((data, index) => (
                    <SwiperSlide key={index}>
                      <Link to={`/internship/${data.id}`}>
                        <Card data={data} />
                      </Link>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>

            {internships?.filter(data => data.branch === 'Computer')?.length > 0 &&
              <div className="w-full lg:w-[95%] xl:w-[90%] px-0 sm:px-8 md:px-0 mx-auto flex flex-col gap-4 sm:gap-6">

                <h2 className="text-base xs:text-2xl sm:text-3xl font-bold py-6 px-6 sm:px-6  ">CSE/IT Engineering</h2>

                <Swiper
                  spaceBetween={0}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      grabCursor: true,
                      centeredSlides: true,
                      autoplay: {
                        delay: 4000
                      },
                      speed: 800,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 80,
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 60
                    },
                  }}
                  autoplay={{
                    delay: 2750,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Autoplay]}
                  className="mySwiper w-[80%] sm:w-[63%] md:w-[95%] lg:w-[85%] xl:w-[95%] mx-auto h-[27rem] internship-swiper"
                >
                  {
                    internships?.filter(data => data.branch === 'Computer')?.map((data, index) => (
                      <SwiperSlide key={index}>
                        <Link to={`/internship/${data.id}`}>
                          <Card data={data} />
                        </Link>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>
            }
            {internships?.filter(data => data.branch === 'Electronics')?.length > 0 &&
              <div className="w-full lg:w-[95%] xl:w-[90%] px-0 sm:px-8 md:px-0 mx-auto flex flex-col gap-4 sm:gap-6">

                <h2 className="text-base xs:text-2xl sm:text-3xl font-bold py-6 px-6 sm:px-6  ">ECE/EEE Engineering</h2>

                <Swiper
                  spaceBetween={0}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      grabCursor: true,
                      centeredSlides: true,
                      autoplay: {
                        delay: 4000
                      },
                      speed: 800,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 80,
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 60
                    },
                  }}
                  autoplay={{
                    delay: 2750,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Autoplay]}
                  className="mySwiper w-[80%] sm:w-[63%] md:w-[95%] lg:w-[85%] xl:w-[95%] mx-auto h-[27rem] internship-swiper"
                >
                  {
                    internships?.filter(data => data.branch === 'Electronics')?.map((data, index) => (
                      <SwiperSlide key={index}>
                        <Link to={`/internship/${data.id}`}>
                          <Card data={data} />
                        </Link>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>
            }
            {
              internships?.filter(data => data.branch === 'Mechanical')?.length > 0 &&
              <div className="w-full lg:w-[95%] xl:w-[90%] px-0 sm:px-8 md:px-0 mx-auto flex flex-col gap-4 sm:gap-6">

                <h2 className="text-base xs:text-2xl sm:text-3xl font-bold py-6 px-6 sm:px-6  ">Mechanical Engineering</h2>

                <Swiper
                  spaceBetween={0}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      grabCursor: true,
                      centeredSlides: true,
                      autoplay: {
                        delay: 4000
                      },
                      speed: 800,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 80,
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 60
                    },
                  }}
                  autoplay={{
                    delay: 2750,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Autoplay]}
                  className="mySwiper w-[80%] sm:w-[63%] md:w-[95%] lg:w-[85%] xl:w-[95%] mx-auto h-[27rem] internship-swiper"
                >
                  {
                    internships?.filter(data => data.branch === 'Mechanical')?.map((data, index) => (
                      <SwiperSlide key={index}>
                        <Link to={`/internship/${data.id}`}>
                          <Card data={data} />
                        </Link>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>
            }
            {
              internships?.filter(data => data.branch === 'Civil')?.length > 0 &&
              <div className="w-full lg:w-[95%] xl:w-[90%] px-0 sm:px-8 md:px-0 mx-auto flex flex-col gap-4 sm:gap-6">
                <h2 className="text-base xs:text-2xl sm:text-3xl font-bold py-6 px-6 sm:px-6  ">Civil Engineering</h2>

                <Swiper
                  spaceBetween={0}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      grabCursor: true,
                      centeredSlides: true,
                      autoplay: {
                        delay: 4000
                      },
                      speed: 800,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 80,
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 60
                    },
                  }}
                  autoplay={{
                    delay: 2750,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[Autoplay]}
                  className="mySwiper w-[80%] sm:w-[63%] md:w-[95%] lg:w-[85%] xl:w-[95%] mx-auto h-[27rem] internship-swiper"
                >
                  {
                    internships?.filter(data => data.branch === 'Civil')?.map((data, index) => (
                      <SwiperSlide key={index}>
                        <Link to={`/internship/${data.id}`}>
                          <Card data={data} />
                        </Link>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>


            }
          </div>



          <Footer />
        </div >
        <Component />
      </div>
    </>
  );
};

export default Home;
