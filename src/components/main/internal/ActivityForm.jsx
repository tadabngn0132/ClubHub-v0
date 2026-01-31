import {
  createActivity,
  getActivityById,
  getActivitiesList,
  deleteActivityById
} from '../../../store/slices/activitySlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ActivityForm = ({ type }) => {
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      date: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  useEffect(() => {
    // If editing, fetch activity data here
  }, [])

  const handleSaveData = (data) => {
    // Handle form submission for both add and edit modes
    if (type === "add") {
      dispatch(createActivity(data))
    } else if (type === "edit") {
      // Dispatch update action here
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add / Edit Activity</h2>
      {/* Form fields will go here */}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(handleSaveData)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500 text-xs italic mt-2">{errors.title.message}</p>}
        </div>
      </form>
    </div>
  )
}

export default ActivityForm