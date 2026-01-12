import React from 'react'

const ChangePassword = () => {
  return (
    <div>
      <h1>Change Password</h1>
      <form action="">
        <label htmlFor="current-password">Current Password <span className="text-red-500">*</span></label>
        <input type="password" id="current-password" placeholder="Enter your current password" />

        <label htmlFor="new-password">New Password <span className="text-red-500">*</span></label>
        <input type="password" id="new-password" placeholder="Enter your new password" />

        <label htmlFor="confirm-new-password">Confirm New Password <span className="text-red-500">*</span></label>
        <input type="password" id="confirm-new-password" placeholder="Confirm your new password" />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ChangePassword