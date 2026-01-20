import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import { forgotPasswordUser } from '../../store/slices/authSlice'
import { useState } from 'react'
import { current } from '@reduxjs/toolkit'

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const [currentResData, setCurrentResData] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const handleForgotPassword = async (data) => {
    console.log(data)
    const resData = await dispatch(forgotPasswordUser(data)).unwrap()
    setCurrentResData(resData)
    console.log(resData)
  }

  return (
    <div className='flex min-h-[100vh] items-center-safe justify-center-safe'>
      <form action="" onSubmit={handleSubmit(handleForgotPassword)} className='flex flex-col bg-white/10 w-3/12 p-3.5 rounded-2xl gap-5.5'>
        <h1 className='text-center text-2xl/tight font-bold w-full'>Forgot Password</h1>

        <div className='flex flex-col'>
          <label htmlFor="email">Email <span className="text-red-500">*</span></label>
          <input type="email" id="email" className='outline-none border-b-1 pt-2 pb-2 focus:border-b-[var(--pink-color)] text-sm/tight' placeholder='Enter your email' {...register('email', {
            required: 'Email cannot be empty',
            pattern: {
              value: /^[A-Za-z0-9]+@fpt\.edu\.vn$/,
              message: 'Email must have @fpt.edu.vn tail'
            }
          })} />
          {/* Email error */}
          { errors.email &&
            <span className="text-[var(--red-color)] text-[10px] lg:text-[11px] mt-0.5">
              { errors.email.message }
            </span>
          }
        </div>

        <input type="submit" className='p-1 bg-[var(--pink-color)] w-full rounded-md cursor-pointer hover:bg-[var(--dark-pink-color)]' value="Submit" />

        { currentResData && <p className='p-1.5 text-[var(--pink-color)]'>{ currentResData.message }</p> }
      </form>    
    </div>
  )
}

export default ForgotPassword