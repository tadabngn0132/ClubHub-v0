import { Link } from 'react-router-dom'
import {
  getUserById,
  getUsersList,
  deleteUserById
} from '../../../store/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const AdminMembers = () => {
  const dispatch = useDispatch()
  const { usersList, isLoading, isError, message } = useSelector((state) => state.user)
  
  useEffect(() => {
    dispatch(getUsersList())
  }, [dispatch])

  const handleDelete = (userId) => {
    dispatch(deleteUserById(userId))
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center-safe justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Members</h1>
          <p className="text-sm text-gray-500">{usersList ? usersList.length : 0} members</p> {/* Dynamic member count */}
        </div>
        
        <span>
          <Link to="/admin/members/add" className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white">Add Member</Link>
        </span>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-2">Member ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {usersList && usersList.map((user) => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <Link to={`/admin/members/view/${user.id}`} className="text-green-500 hover:underline mr-2">View</Link>
                <Link to={`/admin/members/edit/${user.id}`} className="text-blue-500 hover:underline mr-2">Edit</Link>
                <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminMembers