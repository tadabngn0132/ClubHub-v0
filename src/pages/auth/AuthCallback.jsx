import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

const AuthCallback = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      const success = searchParams.get('success')
      const userData = searchParams.get('user')
      
      if (success && userData) {
        const user = JSON.parse(decodeURIComponent(userData))
        
        // Gọi API lấy accessToken
        const data = await refreshAccessToken()
        localStorage.setItem('accessToken', data.accessToken)
        
        // Lưu user vào context/redux
        // setUser(user)
        
        // Redirect dựa trên role
        switch(user.role) {
          case 'admin':
            navigate('/admin/dashboard')
            break
          case 'moderator':
            navigate('/moderator/dashboard')
            break
          case 'member':
          default:
            navigate('/dashboard')
            break
        }
      } else {
        navigate('/login?error=auth_failed')
      }
    }

    handleCallback()
  }, [searchParams, navigate])

  return <div>Authenticating...</div>
}

export default AuthCallback