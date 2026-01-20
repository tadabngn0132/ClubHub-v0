import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { changePasswordUser } from '../../store/slices/authSlice'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const handleChangePassword = async (data) => {
    console.log(data)
    const resData = await dispatch(changePasswordUser(data)).unwrap()
    console.log(resData)
  }

  return (
    <div className='flex min-h-[100vh] items-center-safe justify-center-safe'>
      <form onSubmit={handleSubmit(handleChangePassword)} className='flex flex-col bg-white/10 w-3/12 p-3.5 rounded-2xl gap-5.5'>
        <h1 className='text-center text-2xl/tight font-bold w-full'>Change Password</h1>

        <div className='flex flex-col'>
          <label htmlFor="current-password">Current Password <span className="text-red-500">*</span></label>
          <input type="password" id="current-password" className='outline-none border-b-1 pt-2 pb-2 focus:border-b-[var(--pink-color)] text-sm/tight' placeholder="Enter your current password" {...register('currentPassword', { 
            required: 'Password cannot be empty',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })} />
          {/* Current Password error */}
          { errors.currentPassword &&
            <span className="text-[var(--red-color)] text-[10px] lg:text-[11px] mt-0.5">
              { errors.currentPassword.message }
            </span>
          }
        </div>

        <div className='flex flex-col'>
          <label htmlFor="new-password">New Password <span className="text-red-500">*</span></label>
          <input type="password" id="new-password" className='outline-none border-b-1 pt-2 pb-2 focus:border-b-[var(--pink-color)] text-sm/tight' placeholder="Enter your new password" {...register('newPassword', { 
            required: 'Password cannot be empty',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            }
          })} />
          {/* New Password error */}
          { errors.newPassword &&
            <span className="text-[var(--red-color)] text-[10px] lg:text-[11px] mt-0.5">
              { errors.newPassword.message }
            </span>
          }
        </div>

        <div className='flex flex-col'>
          <label htmlFor="confirm-new-password">Confirm New Password <span className="text-red-500">*</span></label>
          <input type="password" id="confirm-new-password" className='outline-none border-b-1 pt-2 pb-2 focus:border-b-[var(--pink-color)] text-sm/tight' placeholder="Confirm your new password" {...register('confirmNewPassword', { 
            required: 'Password cannot be empty',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            },
            validate: (value) => value === watch('newPassword') || 'Passwords do not match'
          })} />
          {/* Confirm New Password error */}
          { errors.confirmNewPassword &&
            <span className="text-[var(--red-color)] text-[10px] lg:text-[11px] mt-0.5">
              { errors.confirmNewPassword.message }
            </span>
          }
        </div>

        <input type="submit" className='p-1 bg-[var(--pink-color)] w-full rounded-md cursor-pointer hover:bg-[var(--dark-pink-color)]' value="Submit" />
      </form>
    </div>
  )
}

export default ChangePassword