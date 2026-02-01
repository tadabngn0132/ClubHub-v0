import React from 'react'

const ProfileInfoTab = () => {
  return (
    <div>
      <label htmlFor="avatar">Avatar</label>
      <input type="file" id="avatar" accept="image/*" />  

      <label htmlFor="bio">Bio</label>
      <textarea id="bio" placeholder='A short bio about the member...' />
    </div>
  )
}

export default ProfileInfoTab