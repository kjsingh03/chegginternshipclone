import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import Component from '../whatsapp/Component'

function Refund() {
    return (
        <>
       <Navbar/>
        <div  className="w-full xl:w-[95%] min-h-[100vh] mx-auto  flex flex-col  text-center px-3 sm:px-0 gap-6 lg:gap-12 pb-[5rem] pt-[8rem]">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mx-auto">Refund Policy for Skillwallah Courses</h1>

            <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">At Skillwallah, we strive to provide you with high-quality courses that empower and enhance your skills. We understand that sometimes circumstances may require you to seek a refund. Please review our refund policy below to understand the terms and conditions associated with refunds.</p>

            <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">1. Eligibility for Refund:</h2>
            <ul className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">
                <li>Refunds will be considered within [X days/weeks] from the date of purchase.</li>
                <li>To be eligible for a refund, you must have not completed more than [X]% of the course content.</li>
            </ul>

            <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">2. Grounds for Refund:</h2>
            <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Refunds will be granted under the following circumstances:</p>
            <ul className="text-sm lg:text-sm font-medium w-full sm:w-[60%] mx-auto">
                <li>Technical issues: If you encounter technical problems preventing you from accessing the course material.</li>
                <li>Dissatisfaction: If you are unsatisfied with the course content and can provide specific feedback on the areas of concern.</li>
            </ul>

            <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">3. Non-Eligibility for Refund:</h2>
            <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Refunds will not be provided under the following circumstances:</p>
            <ul className="text-sm lg:text-sm font-medium w-full sm:w-[60%] mx-auto">
                <li>Completion of more than [X]% of the course content.</li>
                <li>Failure to meet eligibility criteria outlined in this policy.</li>
                <li>Change of mind or personal circumstances unrelated to the course content.</li>
            </ul>

            <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">4. How to Request a Refund:</h2>
            <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">To initiate the refund process, please contact our support team at <a href="mailto:support@skillwallah.com">support@skillwallah.com</a> within the specified refund period. Provide your order details, a clear explanation of the issue, and any supporting documentation.</p>

            <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">5. Processing Time:</h2>
            <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Refunds will be processed within [X] business days after approval. The amount refunded will be the original purchase price, minus any applicable fees.</p>

            <h2  className="text-xl md:text-2xl lg:text-3xl font-bold mx-auto">6. Contact Us:</h2>
            <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">If you have any questions or concerns regarding our refund policy, please contact our support team at <a href="mailto:support@skillwallah.com">support@skillwallah.com</a>.</p>

            <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto"><strong>Note:</strong> Skillwallah reserves the right to update or modify this refund policy at any time without prior notice.</p>

            <p  className="text-sm lg:text-lg font-medium w-full sm:w-[60%] mx-auto">Thank you for choosing Skillwallah for your learning journey.</p>
        </div>
        <Component/>
        <Footer/>
        </>
    )
}

export default Refund
