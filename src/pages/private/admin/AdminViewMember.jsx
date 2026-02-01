import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import {
  getUserById,
  deleteUserById
} from '../../../store/slices/userSlice'
import toast, { Toaster } from 'react-hot-toast'
import { getActivitiesByUserId } from '../../../store/slices/activitySlice'

const AdminViewMember = () => {
  const { memberId } = useParams()
  const dispatch = useDispatch()
  const { currentMember, loading, error } = useSelector((state) => state.user)
  const { userActivities, isLoading: activitiesLoading, error: activitiesError } = useSelector((state) => state.activity)

  const handleDelete = () => {
    // Dispatch delete action here
    dispatch(deleteUserById(memberId))
  }

  useEffect(() => {
    dispatch(getUserById(memberId))
    dispatch(getActivitiesByUserId(memberId))
  }, [dispatch, memberId])

  if (loading) return <p>Loading...</p>
  if (error) toast.error(error)
  if (!currentMember) return <p>No member found.</p>

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <Link to="/admin/members">Back to Members List</Link>

      <header>
        <img src={currentMember.avatarUrl} alt="Avatar" />
        <h1>{currentMember.name}</h1>
        <p>{currentMember.role}</p>
        <p>{currentMember.email}</p>
        <p>{currentMember.phoneNumber}</p>
        <Link to={`/admin/members/${memberId}/edit`}>Edit Member</Link>
        <button onClick={() => handleDelete()}>Delete Member</button>
      </header>

      <section id='basic-info'>
        <h2>Basic Informations</h2>
        <p><strong>Email:</strong> {currentMember.email}</p>
        <p><strong>Phone Number:</strong> {currentMember.phoneNumber}</p>
        <p><strong>Date of Birth:</strong> {currentMember.dateOfBirth}</p>
        <p><strong>Gender:</strong> {currentMember.gender}</p>
        <p><strong>Major:</strong> {currentMember.major}</p>
      </section>

      <section id='club-info'>
        <h2>Club's Member Information</h2>
        <p><strong>Gen:</strong> {currentMember.gen}</p>
        <p><strong>Department:</strong> {currentMember.department}</p>
        <p><strong>Role:</strong> {currentMember.role}</p>
        <p><strong>Joined Date:</strong> {currentMember.joinedDate}</p>
        <p><strong>Status:</strong> {currentMember.status}</p>
      </section>

      <section id='profile-info'>
        <h2>Profile Information</h2>
        <p>{currentMember.bio}</p>
      </section>

      <section id='activity-summary'>
        <h2>Activity Summary</h2>
        <p><strong>Events Participated:</strong> {userActivities.length}</p>
        <p><strong>Meetings Attended:</strong> {userActivities.filter(activity => activity.type === 'meeting').length}</p>
        {/* Get tasks from server instead of current task type activities later */}
        <p><strong>Tasks Completed:</strong> {userActivities.filter(activity => activity.type === 'task').length}</p>
      </section>

      <section id='recent-activities-list'>
        <h2>Recent Activities</h2>
        {activitiesLoading ? (
          <p>Loading activities...</p>
        ) : activitiesError ? (
          toast.error(activitiesError)
        ) : (
          <ul>
            {userActivities.map((activity) => (
              <li key={activity.id}>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}

        {/* Need to use tasks data from API instead of current activities later */}
        <h2>Recent CF Tasks</h2>
        {activitiesLoading ? (
          <p>Loading activities...</p>
        ) : activitiesError ? (
          toast.error(activitiesError)
        ) : (
          <ul>
            {userActivities.map((activity) => (
              <li key={activity.id}>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>  
    </div>
  )
}

export default AdminViewMember