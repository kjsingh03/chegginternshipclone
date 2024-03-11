import React from 'react'
import { Link } from 'react-router-dom'

function Card({ data }) {

    const user = JSON.parse(localStorage.getItem("credentials"))

    return (
        <Link to={`/internship/${data.id}`} className="shadow-sm card w-[19rem] sm:w-[20rem] overflow-hidden hover:shadow-lg transition-all duration-150 ease-in flex flex-col justify-between px-10 py-8 lg:p-8 gap-9 rounded-xl border-[1.6px] border-[#dadada]">
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
            <div className='btn text-sm text-[#1B88F4] bg-transparent border-2 border-[#1B88F4]'>View Details</div>
        </Link>
    )
}

export default Card
