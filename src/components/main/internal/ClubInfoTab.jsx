import React from 'react'
import { useFormContext } from 'react-hook-form'

const ClubInfoTab = () => {
  const { register, formState: { errors } } = useFormContext()
  const departmentList = [
    { id: 1, name: 'Dance' },
    { id: 2, name: 'Communication' },
    { id: 3, name: 'Design' },
    { id: 4, name: 'Human Resources' },
    { id: 5, name: 'Logistics' },
    { id: 6, name: 'Content' },
    { id: 7, name: 'Media' }
  ]
  
  return (
    <div>
      <label htmlFor="generation">Generation <span className='text-red-500'>*</span></label>
      <input type="text" id="generation" placeholder='2025' {...register("generation", { required: 'Generation cannot be empty' })} />
      {errors.generation && <p className="text-red-500 text-sm">{errors.generation.message}</p>}

      <label htmlFor="department">Department <span className='text-red-500'>*</span></label>
      {departmentList.map((department) => (
        <React.Fragment key={department.id}>
          <input
            type="checkbox"
            name="department"
            id={department.name.toLowerCase().replace(/\s+/g, '')}
            {...register("department", { required: 'Department cannot be empty' })}
          />
          <label htmlFor={department.name.toLowerCase().replace(/\s+/g, '')}>{department.name}</label>
        </React.Fragment>
      ))}
      {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}

      <label htmlFor="position">Position <span className='text-red-500'>*</span></label>
      {departmentList.map((department) => (
        <React.Fragment key={department.id}>
          <input
            type="checkbox"
            name="position"
            id={department.name.toLowerCase().replace(/\s+/g, '') + 'member'}
            {...register("position", { required: 'Position cannot be empty' })}
          />
          <label htmlFor={department.name.toLowerCase().replace(/\s+/g, '') + 'member'}>Member of {department.name}</label>
        </React.Fragment>
      ))}

      {departmentList.map((department) => (
        <React.Fragment key={department.id}>
          <input
            type="checkbox"
            name="position"
            id={department.name.toLowerCase().replace(/\s+/g, '') + 'head'}
            {...register("position", { required: 'Position cannot be empty' })}
          />
          <label htmlFor={department.name.toLowerCase().replace(/\s+/g, '') + 'head'}>Head of {department.name}</label>
        </React.Fragment>
      ))}
      {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}

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