import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { updateUserInternships } from '../../store/internshipslice'
import { useDispatch } from 'react-redux'

function Card({ data, route = 'internship',deleteInternship }) {

    const dispatch = useDispatch()

    const user = JSON.parse(localStorage.getItem("credentials"))

 


    return (
        <div className="shadow-sm card w-[80vw] sm:w-[22rem] overflow-hidden hover:shadow-lg transition-all duration-150 ease-in flex flex-col justify-between gap- rounded-xl border-[1.6px] border-[#dadada]">
            <div className="flex flex-col gap-1">
                <img src={data?.imageUrl} alt="" className='w-full h-[12rem] object-fill' />
            </div>
            <div className=" px-10 py-8 lg:py-6 lg:px-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2 ">
                    <h3 className="text-lg font-bold text-left">{data.name}</h3>
                    <p className='flex items-center gap-2 font-medium'><i className="w-4 fa-solid fa-calendar-days"></i> {data.duration} Week(s)</p>
                    <div className="flex items-center gap-2 font-medium">
                        <p className='flex items-center gap-2 '><i className="w-4 fa-solid fa-money-bill"></i><span className='text-[1rem]'>{(data.price * (1 - data.discount / 100)).toFixed(2)}</span></p>
                        <p className='flex gap-2 line-through'>{data.price.toFixed(2)}</p>
                        <p className='flex gap-2 text-sm text-red-500'>({data.discount}% off)</p>
                    </div>
                    {
                        user?.role==='Admin' &&
                    <p className='flex items-center gap-2 font-medium'><i className="fa-solid fa-graduation-cap"></i> {data.studentsEnrolled.filter(stud=>stud!==null).length} student(s) enrolled</p>
                    }
                </div>
                <div className="flex gap-4">
                    {
                        route !== 'update' &&
                        <Link to={`/internship/${data.id}`} className='btn text-sm text-[#1B88F4] bg-transparent border-2 border-[#1B88F4]'>View Details</Link>
                    }

                    {
                        route === 'update' &&
                        <Link to={`/update/${data.id}`} className='btn text-sm text-[#1B88F4] bg-transparent border-2 border-[#1B88F4]'>Update</Link>
                    }
                    {
                        route === 'update' &&
                        <div onClick={() => deleteInternship(data.id)} className='btn text-sm text-[#1B88F4] bg-transparent border-2 border-[#1B88F4]'>Delete</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Card
