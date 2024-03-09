import React from 'react'
import { Link } from 'react-router-dom'

function Card({ data }) {

    const user = JSON.parse(localStorage.getItem("credentials"))

    return (
        <Link to={user ? `/internship/${data.id}` : "/login"} className="shadow-lg card w-[20rem] sm:w-[19rem] overflow-hidden hover:shadow-xl transition-all duration-150 ease-in flex flex-col justify-between p-8 gap-9 rounded-lg border border-[#EAECF0]">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold  ">{data.name}</h3>
                {/* <h2 className="text-base font-bold  ">{data.organisation}</h2> */}
            </div>
            <div className="">
                <p className='flex items-center gap-2 font-medium'><i className="w-4 fa-solid fa-calendar-days"></i> {data.duration} Week(s)</p>
                <div className="flex items-center gap-2 font-medium">
                    <p className='flex items-center gap-2 '><i className="w-4 fa-solid fa-money-bill"></i><span className='text-[1rem]'>{data.price * (1 - data.discount / 100)}</span></p>
                    <p className='flex gap-2 line-through'>{data.price}</p>
                    <p className='flex gap-2 text-sm text-red-500'>({data.discount}% off)</p>
                </div>
            </div>
            <div className='btn '>View Details</div>
        </Link>
    )
}

export default Card
