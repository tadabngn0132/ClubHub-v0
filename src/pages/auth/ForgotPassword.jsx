import React from 'react'
import { useForm } from "react-hook-form"

const ForgotPassword = () => {
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

  const handleForgotPassword = (data) => {
    // Handle forgot password logic here
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit(handleForgotPassword)}>
        <h1>Forgot Password</h1>
        <label htmlFor="email">Email <span className="text-red-500">*</span></label>
        <input type="email" id="email" placeholder='Enter your email' {...register('email', {
          required: 'Email cannot be empty',
          pattern: {
            value: /^[A-Za-z0-9]+@fpt\.edu\.vn$/,
            message: 'Email must have @fpt.edu.vn tail'
          }
        })} />
        {/* Email error */}
        { errors.email &&
          <span className="text-[var(--red-color)] text-[10px] lg:text-[11px] pl-4">
            { errors.email.message }
          </span>
        }
        <button type="submit">Submit</button>
      </form>    
    </div>
  )
}

export default ForgotPassword