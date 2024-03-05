import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

function Cards() {

    const internships = useSelector(state => state.internships)

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

    return (
        <div className="w-full lg:w-[95%] xl:w-[90%] 2xl:w-[85%] px-0 sm:px-8 md:px-0 mx-auto flex flex-col gap-16">
            <h2 className="text-3xl font-bold px-12 xl:px-0">Featured skill programs</h2>
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
