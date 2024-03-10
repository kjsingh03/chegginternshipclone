import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Component from '../whatsapp/Component'

function PrivacyPolicy() {
    return (
        <>
            <Navbar />
            <div  className="w-full xl:w-[95%] min-h-[100vh] mx-auto  text-center flex flex-col px-3 sm:px-0 gap-6 lg:gap-12 pb-[5rem] pt-[8rem]">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mx-auto">Privacy Policy</h1>

                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Your privacy is important to Skillwallah. This Privacy Policy outlines the types of personal information we collect, how it is used, and the steps we take to ensure your information is handled responsibly and in accordance with applicable privacy laws.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">1. Information We Collect</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">We may collect personal information such as your name, email address, and billing details when you create an account or make a purchase on Skillwallah. We also collect non-personal information, including but not limited to, browser type, device information, and IP addresses for analytics purposes.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">2. Use of Information</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Personal information is used to provide and improve our services, communicate with you, and process transactions. Non-personal information is used for analytical purposes to enhance the user experience on Skillwallah.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">3. Information Sharing</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent. However, we may share information with trusted service providers who assist us in operating our website and conducting our business, as long as those parties agree to keep the information confidential.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">4. Security Measures</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Skillwallah takes reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no data transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">5. Cookies</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Skillwallah uses cookies to enhance your user experience. You can choose to disable cookies in your browser settings, but this may affect certain features of the website.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">6. Changes to Privacy Policy</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Skillwallah reserves the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page, and the date of the last update will be indicated at the top of the page.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">7. Contact Information</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@skillwallah.com">privacy@skillwallah.com</a>.</p>

                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Thank you for entrusting Skillwallah with your learning journey. We are committed to safeguarding your privacy.</p>

            </div>
<Component/>
            <Footer />
        </>
    )
}

export default PrivacyPolicy
