import { useState } from 'react'
import Loading from '../../../components/layout/internal/Loading.jsx'

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 2000)

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage activities, users, and settings.</p>
    </div>
  )
}

export default AdminDashboard