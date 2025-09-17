import React from 'react'

const ErrorBoundary = () => {
  return (
    <div className='bg-white text-black'>
      <img src="src/assets/items/404.webp" alt="404 image" />
      <span className='pink-color monument-extra-bold text-3xl'>PAGE NOT FOUND</span>
      <div>
        <p>Lorem ipsum</p>
        <button>Back to Home Page</button>
      </div>
    </div>
  )
}

export default ErrorBoundary