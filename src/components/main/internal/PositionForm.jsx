import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  createNewPosition,
  getPositionDetails,
  updatePositionById,
} from "../../../store/slices/positionSlice"
import toast, { Toaster } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import Loading from "../../../components/layout/internal/Loading"

const PositionForm = ({ mode, positionId }) => {
  const dispatch = useDispatch()
  const { position, isLoading, error } = useSelector((state) => state.position)

  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      level: '',
      systemRole: '',
    },
  })

  useEffect(() => {
    if (mode === 'edit' && positionId) {
      dispatch(getPositionDetails(positionId))

      if (position) {
        reset({
          title: position.title,
          level: position.level,
          systemRole: position.systemRole,
        })
      }
    } else if (mode === 'add') {
      reset({
        title: '',
        level: '',
        systemRole: '',
      })
    }
  }, [dispatch, mode, positionId, reset, position])

  const handleSaveData = (data) => {
    if (mode === 'add') {
      dispatch(createNewPosition(data))
    } else if (mode === 'edit') {
      dispatch(updatePositionById({ id: positionId, positionData: data }))
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    toast.error(error)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleSaveData)} className='max-w-md mx-auto bg-white p-6 rounded shadow'>
        <div className="mb-4">
          <label htmlFor="title" className='block text-gray-700 font-bold mb-2'>Title</label>
          <input
            id="title"
            {...register('title', { required: 'Title is required' })}
            className='w-full border border-gray-300 p-2 rounded'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="level" className='block text-gray-700 font-bold mb-2'>Level</label>
          <input
            id="level"
            {...register('level', { required: 'Level is required' })}
            className='w-full border border-gray-300 p-2 rounded'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="systemRole" className='block text-gray-700 font-bold mb-2'>System Role</label>
          <input
            id="systemRole"
            {...register('systemRole', { required: 'System Role is required' })}
            className='w-full border border-gray-300 p-2 rounded'
          />
        </div>
        <input type="submit" value={mode === 'add' ? 'Submit' : 'Save'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer' />
      </form>
    </div>
  )
}

export default PositionForm