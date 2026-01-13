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
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <label htmlFor="current-password">Current Password <span className="text-red-500">*</span></label>
        <input type="password" id="current-password" placeholder="Enter your current password" {...register('currentPassword', { 
          required: 'Password cannot be empty',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        })} />
        {/* Current Password error */}
        { errors.currentPassword &&
          <span className="text-[var(--red-color)] text-[10px] lg:text-[11px] pl-4">
            { errors.currentPassword.message }
          </span>
        }
        <label htmlFor="new-password">New Password <span className="text-red-500">*</span></label>
        <input type="password" id="new-password" placeholder="Enter your new password" {...register('newPassword', { 
          required: 'Password cannot be empty',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        })} />
        {/* New Password error */}
        { errors.newPassword &&
          <span className="text-[var(--red-color)] text-[10px] lg:text-[11px] pl-4">
            { errors.newPassword.message }
          </span>
        }
        <label htmlFor="confirm-new-password">Confirm New Password <span className="text-red-500">*</span></label>
        <input type="password" id="confirm-new-password" placeholder="Confirm your new password" {...register('confirmNewPassword', { 
          required: 'Password cannot be empty',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          },
          validate: (value) => value === watch('newPassword') || 'Passwords do not match'
        })} />
        {/* Confirm New Password error */}
        { errors.confirmNewPassword &&
          <span className="text-[var(--red-color)] text-[10px] lg:text-[11px] pl-4">
            { errors.confirmNewPassword.message }
          </span>
        }
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ChangePassword