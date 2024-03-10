import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import '../../App.css'
import Component from '../whatsapp/Component'

function About() {
    return (
        <>
            <Navbar />
            <div className="w-full xl:w-[95%] min-h-[100vh] mx-auto text-center flex flex-col px-3 sm:px-0 gap-6 lg:gap-12 pb-[5rem] pt-[8rem]">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mx-auto">About skillwallah</h1>
               

                <p className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Welcome to Skillwallah (Techma Future), where learning meets opportunity. Our mission is to empower individuals like you to unlock your full potential through skill development. Whether you're looking to enhance your professional expertise or explore new passions, Skillwallah (Techma Future) is your dedicated partner on the journey to success.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">Our Mission</h2>
                <p className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">At Skillwallah (Techma Future), we are committed to providing accessible, high-quality courses that cater to a diverse range of interests and skill levels. We believe in the transformative power of education and its ability to positively impact lives.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">Meet the Team</h2>
                <p className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">We have a passionate and dedicated team of educators, content creators, and support staff working behind the scenes to make your learning experience exceptional. Our diverse team brings together expertise from various fields to ensure that Skillwallah (Techma Future) offers a rich and dynamic learning environment.</p>


                

                <p className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Thank you for choosing Skillwallah (Techma Future) for your learning needs. We look forward to being a part of your educational journey!</p>

            </div>
            <Component/>
            <Footer />
        </>
    )
}

export default About
