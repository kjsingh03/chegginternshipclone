import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

function Cards() {

    const internships = useSelector(state => state.internships)

    return (
        <div className="w-full xl:w-[80%] px-0 sm:px-8 md:px-0 mx-auto">
            <h2 className="text-2xl font-bold my-6 px-12 xl:px-0">Featured skill programs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-8 ">
                {
                    internships?.map((internship,index) => (
                        <Card key={index} data={internship} />
                    ))
                }
            </div>
        </div>
    )
}

export default Cards
