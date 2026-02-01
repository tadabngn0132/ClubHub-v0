import React from 'react'
import { useFormContext } from 'react-hook-form'

const ClubInfoTab = () => {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div>
      <label htmlFor="generation">Generation <span className='text-red-500'>*</span></label>
      <input type="text" id="generation" placeholder='2025' {...register("generation", { required: 'Generation cannot be empty' })} />
      {errors.generation && <p className="text-red-500 text-sm">{errors.generation.message}</p>}

      <label htmlFor="department">Department <span className='text-red-500'>*</span></label>
      <input type="checkbox" name="department" id="dance" {...register("department", { required: 'Department cannot be empty' })} />
      <label htmlFor="dance">Dance</label>
      <input type="checkbox" name="department" id="communication" {...register("department", { required: 'Department cannot be empty' })} />
      <label htmlFor="communication">Communication</label>
      <input type="checkbox" name="department" id="design" {...register("department", { required: 'Department cannot be empty' })} />
      <label htmlFor="design">Design</label>
      <input type="checkbox" name="department" id="hr" {...register("department", { required: 'Department cannot be empty' })} />
      <label htmlFor="hr">Human Resources</label>
      <input type="checkbox" name="department" id="logistics" {...register("department", { required: 'Department cannot be empty' })} />
      <label htmlFor="logistics">Logistics</label>
      <input type="checkbox" name="department" id="content" {...register("department", { required: 'Department cannot be empty' })} />
      <label htmlFor="content">Content</label>
      <input type="checkbox" name="department" id="media" {...register("department", { required: 'Department cannot be empty' })} />
      <label htmlFor="media">Media</label>
      {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}

      <label htmlFor="role">Role <span className='text-red-500'>*</span></label>
      <select name="role" id="role" {...register("role") }>
        <option value="member">Member</option>
        <option value="president">Moderator</option>
        <option value="admin">Admin</option>
      </select>

      <label htmlFor="join_date">Join Date <span className='text-red-500'>*</span></label>
      <input type="date" id="join_date" defaultValue={new Date().toISOString().split("T")[0]} {...register("join_date", { required: 'Join Date cannot be empty' })} />
      {errors.join_date && <p className="text-red-500 text-sm">{errors.join_date.message}</p>}

      <label htmlFor="status">Status</label>
      <select name="status" id="status" {...register("status")}>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Alumni">Alumni</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  )
}

export default ClubInfoTab