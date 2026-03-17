import { Link } from "react-router-dom";
import {
  getAllMemberApplicationsList,
  softDeleteMemberApplicationById,
} from "../../../store/slices/memberApplicationSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";
import { resetMemberApplicationStatus } from "../../../store/slices/memberApplicationSlice.js";

const ModeratorMemberApplications = () => {
  const dispatch = useDispatch();
  const { memberApplications, isLoading, error } = useSelector(
    (state) => state.memberApplication,
  );
  const [selectedMemberApplications, setSelectedMemberApplications] = useState(
    [],
  );

  useEffect(() => {
    dispatch(getAllMemberApplicationsList());
  }, [dispatch]);

  const handleDelete = (applicationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member application? This action cannot be undone.",
    );
    if (!confirmed) {
      return;
    }
    dispatch(softDeleteMemberApplicationById(applicationId));
    dispatch(resetMemberApplicationStatus());
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h1>Member Applications</h1>
      <p>{memberApplications.length} member applications</p>

      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="selectAll" id="selectAll" />
            </th>
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
              <input
                type="checkbox"
                name="application"
                id={`application-${application.id}`}
              />
              <td>{application.name}</td>
              <td>{application.email}</td>
              <td>{application.applicationDate}</td>
              <td>{application.status}</td>
              <td>
                <Link to={`/moderator/member-applications/${application.id}`}>
                  View
                </Link>
                <Link to={`/moderator/member-applications/${application.id}`}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(application.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModeratorMemberApplications;
