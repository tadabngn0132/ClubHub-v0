import DepartmentsPage from "../shared/DepartmentsPage";

const AdminDepartments = () => {
  return <DepartmentsPage
    role="ADMIN"
    basePath="/admin/departments"
  />;
};

export default AdminDepartments;
