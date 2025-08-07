import './App.css'
import { FORM_FIELD, PLACEHOLDER_FORM } from './constants/FormField'

function App() {
  const handleSignIn = () => {

  }

  return (
    <>
      <div className='sign-in-page-container'>
        {/* head */}
        <div className="sign-in-form-head-container">
          <h2 className="sign-in-head-text">Sign in</h2>
        </div>
        
        {/* form */}
        <div className="sign-in-form-container">
          <form action={handleSignIn}
            className="sign-in-form"
            name='basic-login'>
              <input
                type='text'
                className='sign-in-username-field'
                name={FORM_FIELD.USERNAME}
                placeholder={PLACEHOLDER_FORM.USERNAME}
              />

              <input 
                type="password"
                className='sign-in-password-field'
                name={FORM_FIELD.PASSWORD}
                placeholder={PLACEHOLDER_FORM.PASSWORD}
              />

              <button 
                className='sign-in-submit-btn'
                type="submit"
              >
                  Sign in
              </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
