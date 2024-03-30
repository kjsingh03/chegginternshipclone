import React from 'react'

function Loader() {
  return (
    <div className='w-full h-[calc(100vh-3rem)] flex justify-center items-center bg-white absolute z-[10000] mt-[3rem]'>
      <div className="border-[0.35rem] border-[#1B88F4] p-6 border-t-white animate-spin rounded-[50%]"></div>
    </div>
  )
}

export default Loader
