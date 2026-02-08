import React from 'react'
import { useFormContext } from 'react-hook-form'

const ProfileInfoTab = () => {
  const { register } = useFormContext()
  return (
    <div className="flex flex-col">
      <label htmlFor="avatar" className='mt-3'>Avatar</label>
      <input type="file" id="avatar" accept="image/*" className='mt-2' {...register("avatar")} />

      <label htmlFor="bio" className='mt-3'>Bio</label>
      <textarea id="bio" placeholder='A short bio about the member...' className='mt-2' {...register("bio")} />
    </div>
  )
}

export default ProfileInfoTab