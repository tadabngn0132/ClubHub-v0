import { useForm } from "react-hook-form"
import { resetPasswordUser } from '../../store/slices/authSlice'
import { useDispatch } from 'react-redux'
import toast, { Toaster } from "react-hot-toast"
import { useSearchParams } from 'react-router-dom'

const ResetPassword = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const resetToken = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const handleResetPassword = async (data) => {
    try {
      if (data.newPassword !== data.confirmNewPassword) {
        toast.error('New Password and Confirm New Password do not match')
        return
      }

      const resetData = {
        email: email,
        resetToken: resetToken,
        newPassword: data.newPassword
      }

      console.log(resetData)
      const resData = await dispatch(resetPasswordUser(resetData)).unwrap()
      console.log(resData)
      toast.success("Password reset successful!")
    } catch (error) {
      toast.error(error.message)
      console.error(error)
      return
    }
  }
  
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(handleResetPassword)}>
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
        <button type="submit">Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword