import React from 'react'

const ErrorBoundary = () => {
  return (
    <div className='bg-white text-black p-10 pt-8 pb-8 rounded-4xl w-10/12'>
      <img src="src/assets/items/404.webp" alt="404 image" />
      <div className='flex flex-col gap-6 mt-6 monument-regular'>
        <span className='pink-color monument-extra-bold text-[2.75rem]'>PAGE NOT FOUND</span>
        <div className='flex justify-between'>
          <p className='text-xs'>Lorem ipsum</p>
          <button className='text-black text-md font-bold'>Back to Home Page</button>
        </div>
      </div>
    </div>
  )
}

export default ErrorBoundary