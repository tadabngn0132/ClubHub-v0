import React from 'react'

const ResetPassword = () => {
  return (
    <div>
      <h1>Reset Password</h1>
      <form action="">
        <label htmlFor="new-password">New Password <span className="text-red-500">*</span></label>
        <input type="password" id="new-password" placeholder="Enter your new password" />
        
        <label htmlFor="confirm-password">Confirm new password <span className="text-red-500">*</span></label>
        <input type="password" id="confirm-password" placeholder="Confirm your new password" />
        
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword