import DepartmentDetailPage from "../shared/DepartmentDetailPage";

const MemberViewDepartment = () => {
  return (
    <DepartmentDetailPage
      role="MEMBER"
      basePath="/member/departments"
    />
  );
};

export default MemberViewDepartment;
