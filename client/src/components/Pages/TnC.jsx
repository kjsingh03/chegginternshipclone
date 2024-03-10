import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Component from '../whatsapp/Component'

function TnC() {
    return (
        <>
            <Navbar />
            <div  className="w-full xl:w-[95%] min-h-[100vh] mx-auto  text-center flex flex-col px-3 sm:px-0 gap-6 lg:gap-12 pb-[5rem] pt-[8rem]">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mx-auto">Terms and Conditions</h1>

                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">By accessing and using the Skillwallah website, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our services.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">1. Acceptance of Terms</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">By using Skillwallah, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our services.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">2. Use of Content</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">All content provided on Skillwallah, including courses, materials, and resources, is for educational purposes only. You may not use the content for any unauthorized purpose without the prior written consent of Skillwallah.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">3. User Accounts</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">When creating an account on Skillwallah, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">4. Refund Policy</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Our refund policy is outlined separately on the Refund Policy page. By using Skillwallah, you agree to the terms and conditions specified in our refund policy.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">5. Modifications to Service</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Skillwallah reserves the right to modify or discontinue any part of the service without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.</p>

                <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">6. Contact Information</h2>
                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">If you have any questions about these terms and conditions, please contact us at <a href="mailto:legal@skillwallah.com">legal@skillwallah.com</a>.</p>

                <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Thank you for using Skillwallah. We appreciate your trust in our platform for your learning needs.</p>

            </div>
<Component/>
            <Footer />
        </>
    )
}

export default TnC
