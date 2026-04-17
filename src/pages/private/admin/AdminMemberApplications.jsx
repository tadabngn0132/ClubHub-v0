import {
  getAllMemberApplicationsList,
  softDeleteMemberApplicationById,
  hardDeleteMemberApplicationById,
  resetMemberApplicationError,
} from "../../../store/slices/memberApplicationSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import MemberApplicationsPage from "../shared/MemberApplicationsPage.jsx";

const AdminMemberApplications = () => {
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
    } else if (deleteType === "hard") {
      dispatch(hardDeleteMemberApplicationById(applicationId));
    }
  };

  return (
    <MemberApplicationsPage
      role="admin"
      memberApplications={memberApplications}
      isLoading={isLoading}
      error={error}
      onResetError={() => dispatch(resetMemberApplicationError())}
      onDelete={handleDelete}
      allowHardDelete={true}
    />
  );
};

export default AdminMemberApplications;
