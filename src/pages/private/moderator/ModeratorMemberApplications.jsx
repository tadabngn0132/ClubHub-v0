import {
  getAllMemberApplicationsList,
  softDeleteMemberApplicationById,
  resetMemberApplicationError,
} from "../../../store/slices/memberApplicationSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MemberApplicationsPage from "../shared/MemberApplicationsPage.jsx";

// TODO(member-application): keep moderator list behavior aligned with admin
// but limit actions to moderator permissions. Use the shared list page once it
// supports aggregate state, detail navigation, and the correct delete policy.

const ModeratorMemberApplications = () => {
  const dispatch = useDispatch();
  const { memberApplications, isLoading, error } = useSelector(
    (state) => state.memberApplication,
  );

  useEffect(() => {
    dispatch(getAllMemberApplicationsList());
  }, [dispatch]);

  const handleDelete = (applicationId, deleteType) => {
    if (deleteType === "soft") {
      dispatch(softDeleteMemberApplicationById(applicationId));
    }
  };

  return (
    <MemberApplicationsPage
      role="moderator"
      memberApplications={memberApplications}
      isLoading={isLoading}
      error={error}
      onResetError={() => dispatch(resetMemberApplicationError())}
      onDelete={handleDelete}
      allowHardDelete={false}
    />
  );
};

export default ModeratorMemberApplications;
