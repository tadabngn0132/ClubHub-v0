import {
  createUser,
  updateUserById,
  getUserById
} from '../../../store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const MemberForm = ({ mode }) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  }
  )

  useEffect(() => {
    if (mode === 'edit') {
      const [searchParams] = useSearchParams()
      const userId = searchParams.get('userId')
      dispatch(getUserById(userId))
    }
  }, [mode])

  const handleSaveData = (data) => {
    // Handle form submission for both add and edit modes
    if (mode === 'add') {
      // Dispatch create user action
      dispatch(createUser(data))
    } else if (mode === 'edit') {
      // Dispatch update user action
      dispatch(updateUserById(data))
    }
  }

  return (
    <div>
      {mode === 'add' && <h2 className="text-2xl font-bold mb-4">Add New Member</h2>}
      {mode === 'edit' && <h2 className="text-2xl font-bold mb-4">Edit Member</h2>}
      {/* Form fields will go here */}

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleSaveData)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter member name"
            {...register('name', { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter member email"
            {...register('email', { 
              required: 'Email cannot be empty',
              pattern: {
                value: /^[A-Za-z0-9]+@fpt\.edu\.vn$/,
                message: 'Email must have @fpt.edu.vn tail'
              }
            })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
            Role
          </label>
          <input
            type="text"
            id="role"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter member role"
            {...register('role', { required: true })}
          />
        </div>
        <div className="flex items-center justify-between">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value={mode === 'add' ? 'Add Member' : 'Update Member'}
          />
        </div>
      </form>
    </div>
  )
}

export default MemberForm