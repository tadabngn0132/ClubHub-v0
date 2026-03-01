import { Link } from "react-router-dom";
import {
  getAllMemberApplicationsList,
  deleteMemberApplicationById,
} from "../../../store/slices/memberApplicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AdminMemberApplication = () => {
  const dispatch = useDispatch();
  const { memberApplications, isLoading, isError, message } = useSelector((state) => state.memberApplication);
  const [selectedMemberApplications, setSelectedMemberApplications] = useState([]);

  useEffect(() => {
    dispatch(getAllMemberApplicationsList());
  }, [dispatch]);

  const handleDelete = (applicationId) => {
    dispatch(deleteMemberApplicationById(applicationId));
  };

  return (
    <div>
      <h1>Member Applications</h1>
      <p>{memberApplications.length} member applications</p>

      <table>
        <thead>
          <tr> 
            <th><input type="checkbox" name="selectAll" id="selectAll" /></th>
            <th>Name</th>
            <th>Email</th>
            <th>Application Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberApplications.map((application) => (
            <tr key={application.id}>
              <input type="checkbox" name="application" id={`application-${application.id}`} />
              <td>{application.name}</td>
              <td>{application.email}</td>
              <td>{application.applicationDate}</td>
              <td>{application.status}</td>
              <td>
                <Link to={`/admin/member-applications/${application.id}`}>View</Link>
                <Link to={`/admin/member-applications/${application.id}`}>Edit</Link>
                <button onClick={() => handleDelete(application.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminMemberApplication