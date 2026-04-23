// TODO(member-application): rebuild this as the shared detail page for admin,
// moderator, and member flows. Fetch the application by id, render the
// aggregate profile, CV review, interview history, final review, and withdraw
// status, then expose only the actions allowed by role and transition state.
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMemberApplicationDetails } from "../../../store/slices/memberApplicationSlice";
import Loading from "../../../components/layout/internal/Loading";

const MemberApplicationDetailsPage = ({ role }) => {
  const { applicationId } = useParams();
  const dispatch = useDispatch();
  const { memberApplication, isLoading } = useSelector(
    (state) => state.memberApplications,
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getMemberApplicationDetails(applicationId));
  }, [dispatch, applicationId]);

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (mode) => {
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = () => {
    if (deleteMode === "soft") {
      dispatch(softDeleteMemberApplicationById());
      handleCloseConfirmationModal();
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteMemberApplicationById());
      handleCloseConfirmationModal();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Member Application Details</h1>
      <Link to={`/${role}/member-applications/view/${application.id}`}>
        <button>View</button>
      </Link>
      {application.state.toLowerCase() === "cv_pending" && (
        <Link to={`/${role}/member-applications/cv-review/${application.id}`}>
          <button>CV Review</button>
        </Link>
      )}
      {application.state.toLowerCase() === "department_interview_pending" && (
        <Link to={`/${role}/member-applications/interview/${application.id}`}>
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
      <button onClick={() => handleDeleteConfigured("soft")}>
        Soft Delete
      </button>
      <button onClick={() => handleDeleteConfigured("hard")}>
        Hard Delete
      </button>

      <p>{memberApplication?.fullname}</p>
      <p>{memberApplication?.email}</p>
      <p>{memberApplication?.phoneNumber}</p>
      <p>{memberApplication?.dateOfBirth}</p>
      <p>{memberApplication?.gender}</p>
      <p>{memberApplication?.major}</p>
      <p>{memberApplication?.studentId}</p>
      <p>{memberApplication?.appliedAt}</p>
      <p>{memberApplication?.state}</p>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this member application?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
};

export default MemberApplicationDetailsPage;
