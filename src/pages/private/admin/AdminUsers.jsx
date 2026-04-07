import UsersPage from "../shared/UsersPage";
import { PERMISSIONS } from "../../../utils/constants";

const AdminUsers = () => {
  return (
    <UsersPage
      role="ADMIN"
      basePath="/admin/users"
      permissions={PERMISSIONS.ADMIN}
    />
  );
};

export default AdminUsers;
