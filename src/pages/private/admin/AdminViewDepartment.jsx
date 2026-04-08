import DepartmentDetailPage from "../shared/DepartmentDetailPage";

const AdminViewDepartment = () => {
  return (
    <DepartmentDetailPage
      role="ADMIN"
      basePath="/admin/departments"
    />
  );
};

export default AdminViewDepartment;
