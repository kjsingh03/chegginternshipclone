import React from 'react'
import { Link } from 'react-router-dom'

function Card({data}) {

    const user = JSON.parse(localStorage.getItem("credentials"))

    return (
        <Link to={user?`/internship/${data.id}`:"/login"} className="hover:shadow-xl transition-all duration-150 ease-in flex flex-col justify-between p-8 gap-6 rounded-lg border border-[#EAECF0]">
            <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">{data.position}</h3>
            <h2 className="text-base font-bold">{data.organisation}</h2>
            </div>
            <div className="">
                <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-location-dot"></i> {data.location} </p>
                <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-money-bill"></i> {data.stipend}/month </p>
                <p className='flex items-center gap-2'><i className="w-4 fa-solid fa-calendar-days"></i> { data.startTime===1?'1 Month':`1 - ${data.startTime} Months`}</p>
            </div>
            <div className='btn'>View Details</div>
        </Link>
    )
}

export default Card
