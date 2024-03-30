import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Component from '../whatsapp/Component'

function Contact() {
    return (
        <>
            <div className="h-screen overflow-y-auto">

            <div className="w-full xl:w-[95%] min-h-[100vh] mx-auto text-center flex flex-col items-center px-3 sm:px-0 gap-6 lg:gap-12 pb-[5rem] pt-[8rem]">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mx-auto">Contact Skillwallah</h1>

                <p className="text-sm lg:text-lg font-medium w-full sm:w-[80%] mx-auto">Have a question, suggestion, or just want to get in touch?<br/><br/> We'd love to hear from you! Please use the contact below to reach out to our team or call at <b>+91 70796 69395</b>.</p>

                <a href={`https://api.whatsapp.com/send?phone=%2B917079669395&text=Hi%2C%20I%20have%20a%20query%20regarding%20skillwallah%20community.`}
                    target='_blank' className="w-max hover:scale-[1.03] transition-all ease-in-out duration-300 font-semibold text-white bottom-4 right-10 bg-[#52C95A] py-4 px-5 rounded-3xl cursor-pointer flex items-center gap-2">
                    <i className="fa-brands fa-whatsapp text-xl translate-y-[0.1rem]"></i>
                    <p>Contact us</p>
                </a>

                <p className="text-sm lg:text-lg font-medium w-full sm:w-[80%] mx-auto">If you prefer, you can also reach us via email at <a href="mailto:info@skillwallah.com" className='font-bold'>skillwallah2@gmail.com</a>. We aim to respond to all inquiries within 7 business days.</p>
            </div>
            <Component/>
            <Footer />
            </div>
        </>
    )
}

export default Contact
