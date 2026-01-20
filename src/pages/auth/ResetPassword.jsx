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
    <div className='flex min-h-[100vh] items-center-safe justify-center-safe'>
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit(handleResetPassword)} className='flex flex-col bg-white/10 w-3/12 p-3.5 rounded-2xl gap-5.5'>
        <h1 className='text-center text-2xl/tight font-bold w-full'>Reset Password</h1>

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
        
        <input type="submit" className='p-1 bg-[var(--pink-color)] w-full rounded-md cursor-pointer hover:bg-[var(--dark-pink-color)]' value="Reset Password" />
      </form>
    </div>
  )
}

export default ResetPassword