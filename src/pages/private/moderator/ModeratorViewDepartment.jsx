import DepartmentDetailPage from "../shared/DepartmentDetailPage";

const ModeratorViewDepartment = () => {
  return (
    <DepartmentDetailPage
      role="MODERATOR"
      basePath="/moderator/departments"
    />
  );
};

export default ModeratorViewDepartment;
