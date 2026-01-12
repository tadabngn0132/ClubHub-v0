import React from 'react'

const ForgotPassword = () => {
  return (
    <div>
      <form action="">
        <h1>Forgot Password</h1>
        <label htmlFor="email">Email <span className="text-red-500">*</span></label>
        <input type="email" id="email" placeholder='Enter your email' />
        <button type="submit">Submit</button>
      </form>    
    </div>
  )
}

export default ForgotPassword