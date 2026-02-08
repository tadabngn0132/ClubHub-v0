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
    <div className="flex flex-col">
      {/* Generation field */}
      <label htmlFor="generation">Generation <span className='text-red-500'>*</span></label>
      <input type="text" id="generation" placeholder='2025' className='mt-2' {...register("generation", { required: 'Generation cannot be empty' })} />
      {errors.generation && <p className="text-red-500 text-sm">{errors.generation.message}</p>}

      {/* Department field */}
      <label htmlFor="department" className='mt-3'>Department <span className='text-red-500'>*</span></label>
      {departmentList.map((department) => (
        <React.Fragment key={department.id}>
          <div className="flex items-center-safe gap-1 mt-1">
            <input
              type="checkbox"
              name="department"
              id={department.name.toLowerCase().replace(/\s+/g, '')}
              {...register("department", { required: 'Department cannot be empty' })}
            />
            <label htmlFor={department.name.toLowerCase().replace(/\s+/g, '')}>{department.name}</label>
          </div>
        </React.Fragment>
      ))}
      {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}

      {/* Position field */}
      <label htmlFor="position" className='mt-3'>Position <span className='text-red-500'>*</span></label>
      {departmentList.map((department) => (
        <React.Fragment key={department.id}>
          <div className='flex items-center-safe gap-1 mt-1'>
            <input
              type="checkbox"
              name="position"
              id={department.name.toLowerCase().replace(/\s+/g, '') + 'member'}
              {...register("position", { required: 'Position cannot be empty' })}
            />
            <label htmlFor={department.name.toLowerCase().replace(/\s+/g, '') + 'member'}>Member of {department.name}</label>
          </div>
        </React.Fragment>
      ))}

      {departmentList.map((department) => (
        <React.Fragment key={department.id}>
          <div className="flex items-center-safe gap-1 mt-1">
            <input
              type="checkbox"
              name="position"
              id={department.name.toLowerCase().replace(/\s+/g, '') + 'head'}
              {...register("position", { required: 'Position cannot be empty' })}
            />
            <label htmlFor={department.name.toLowerCase().replace(/\s+/g, '') + 'head'}>Head of {department.name}</label>
          </div>
        </React.Fragment>
      ))}
      {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}

      {/* Role field */}
      <label htmlFor="role" className='mt-3'>Role <span className='text-red-500'>*</span></label>
      <select name="role" id="role" className='mt-2' {...register("role") }>
        <option className='bg-gray-500' value="member">Member</option>
        <option className='bg-gray-500' value="president">Moderator</option>
        <option className='bg-gray-500' value="admin">Admin</option>
      </select>

      {/* Join Date field */}
      <label htmlFor="join_date" className='mt-3'>Join Date <span className='text-red-500'>*</span></label>
      <input type="date" id="join_date" className='mt-2' defaultValue={new Date().toISOString().split("T")[0]} {...register("join_date", { required: 'Join Date cannot be empty' })} />
      {errors.join_date && <p className="text-red-500 text-sm">{errors.join_date.message}</p>}

      {/* Status field */}
      <label htmlFor="status" className='mt-3'>Status</label>
      <select name="status" id="status" className='mt-2' {...register("status")}>
        <option className='bg-gray-500' value="Active">Active</option>
        <option className='bg-gray-500' value="Inactive">Inactive</option>
        <option className='bg-gray-500' value="Alumni">Alumni</option>
        <option className='bg-gray-500' value="Pending">Pending</option>
      </select>
    </div>
  )
}

export default ClubInfoTab