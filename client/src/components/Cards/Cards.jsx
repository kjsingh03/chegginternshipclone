import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'
import '../../App.css'
import { updateInternships } from '../../store/internshipslice'
import _ from 'lodash'

function Cards() {

    const internships = useSelector(state => state.internships)

    const dispatch = useDispatch()

    const [cardStart,setCardStart] = useState(0)

    const swipeCards = (direction)=>{
        if(direction==='right'){
                if(cardStart<internships?.length-1)
                    setCardStart((prev)=>prev+1)
            }
            else{
                if(cardStart>0)
                    setCardStart((prev)=>prev-1)
        }
    }

    const sortDateAsc = ()=>{
        dispatch(updateInternships(_.sortBy(internships,['price'],['asc'])))
    }
    
    const sortDateDesc = ()=>{
        dispatch(updateInternships(_.orderBy(internships,['price'],['desc'])))
    }
    
    const sortPriorityAsc = ()=>{
        dispatch(updateInternships(_.sortBy(internships,['discount'],['asc'])))
    }
    
    const sortPriorityDesc = ()=>{
        dispatch(updateInternships(_.orderBy(internships,['discount'],['desc'])))
    }

    return (
        <div className="w-full lg:w-[95%] xl:w-[90%] 2xl:w-[85%] px-0 sm:px-8 md:px-0 mx-auto flex flex-col gap-16">
            <div className="flex justify-between">
            <h2 className="text-3xl font-bold px-12 xl:px-0">Featured skill programs</h2>
            <div className="dropdown translate-x-[1.5rem] md:translate-x-0 flex items-center gap-4 md:gap-8 border-[1.6px] border-[#c4c3c3] rounded-xl py-[0.375rem] px-4 md:px-2 md:py-1 cursor-pointer">
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

            <div className="flex items-center gap-2 lg:gap-8">
                <div onClick={()=>swipeCards('left')} className="border border-[white] cursor-pointer w-max h-max px-[1.4rem] py-4 rounded-[50%] overflow-hidden">
                    <i className="fa-solid fa-chevron-left text-white"></i>
                </div>
                <div id="cards" className=" overflow-hidden flex justify-center sm:gap- md:gap-8 lg:gap-8 xl:gap-[4.75rem] w-[80rem]">
                    {
                        internships?.slice(cardStart,cardStart+3).map((internship, index) => (
                                <Card key={index} data={internship} />
                            
                        ))
                    }
                </div>
                <div onClick={()=>swipeCards('right')} className="border border-[white] cursor-pointer w-max h-max px-[1.4rem] py-4 rounded-[50%] overflow-hidden">
                    <i className="fa-solid fa-chevron-right text-white"></i>
                </div>
            </div>
        </div>
    )
}

export default Cards
