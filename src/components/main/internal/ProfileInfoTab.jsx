import React from 'react'
import { useFormContext } from 'react-hook-form'

const ProfileInfoTab = () => {
  const { register } = useFormContext()
  return (
    <div>
      <label htmlFor="avatar">Avatar</label>
      <input type="file" id="avatar" accept="image/*" {...register("avatar")} />

      <label htmlFor="bio">Bio</label>
      <textarea id="bio" placeholder='A short bio about the member...' {...register("bio")} />
    </div>
  )
}

export default ProfileInfoTab