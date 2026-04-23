// TODO(member-application): rebuild this as the main application list screen.
// It should support search, state filters, sort options, bulk actions, state
// badges, and links to the detail page. Keep the list driven by the aggregate
// state field instead of legacy cv/final flat fields.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMemberApplicationsList } from "../../../store/slices/memberApplicationSlice";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal";

const MemberApplicationsPage = ({ role }) => {
  const dispatch = useDispatch();
  const { memberApplications, isLoading } = useSelector(
    (state) => state.memberApplications,
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedMemAppId, setSelectedMemAppId] = useState(null);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getAllMemberApplicationsList());
  }, [dispatch]);

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (memAppId, mode) => {
    setSelectedMemAppId(memAppId);
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = (selectedMemAppId) => {
    if (deleteMode === "soft") {
      dispatch(softDeleteMemberApplicationById(selectedMemAppId));
      handleCloseConfirmationModal();
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteMemberApplicationById(selectedMemAppId));
      handleCloseConfirmationModal();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Member Applications</h1>

      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Major</th>
            <th>Student ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {memberApplications.map((application) => (
            <tr key={application.id}>
              <td>{application.avatar}</td>
              <td>{application.full_name}</td>
              <td>{application.major}</td>
              <td>{application.student_id}</td>
              <td>{application.state}</td>
              <td>
                <Link
                  to={`/${role}/member-applications/view/${application.id}`}
                >
                  <button>View</button>
                </Link>
                {application.state.toLowerCase() === "cv_pending" && (
                  <Link
                    to={`/${role}/member-applications/cv-review/${application.id}`}
                  >
                    <button>CV Review</button>
                  </Link>
                )}
                {application.state.toLowerCase() ===
                  "department_interview_pending" && (
                  <Link
                    to={`/${role}/member-applications/interview/${application.id}`}
                  >
                    <button>Interview</button>
                  </Link>
                )}
                {application.state.toLowerCase() === "final_pending" && (
                  <Link
                    to={`/${role}/member-applications/final-review/${application.id}`}
                  >
                    <button>Final Review</button>
                  </Link>
                )}
                <button
                  onClick={() => handleDeleteConfigured(application.id, "soft")}
                >
                  Soft Delete
                </button>
                <button
                  onClick={() => handleDeleteConfigured(application.id, "hard")}
                >
                  Hard Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this member application?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete(selectedMemAppId)}
      />
    </div>
  );
};

export default MemberApplicationsPage;
