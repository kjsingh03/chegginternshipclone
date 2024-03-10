import React from 'react'

function Component() {
  return (
    <a href={`https://api.whatsapp.com/send?phone=%2B917079669395&text=Hi%2C%20I%20have%20a%20query%20regarding%20skillwallah%20community.`}
     target='_blank' className="fixed hover:scale-[1.03] transition-all ease-in-out duration-300 z-[1500] font-semibold text-white bottom-8 right-10 bg-[#1B88F4] py-4 px-5 rounded-[50%] cursor-pointer flex items-center gap-2">
      <i className="fa-regular fa-message text-xl translate-y-[0.1rem]"></i>
    </a>
  )
}

export default Component
