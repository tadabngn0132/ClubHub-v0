import { Link } from 'react-router-dom'

const AdminMembers = () => {
  return (
    <div className="w-full p-4">
      <div className="flex items-center-safe justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Members</h1>
          <p className="text-sm text-gray-500">50 members</p> {/* Hardcoded member count */}
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
          </tr>
        </thead>
        <tbody className="text-center">
          {/* Member rows will be populated here */}
        </tbody>
      </table>
    </div>
  )
}

export default AdminMembers