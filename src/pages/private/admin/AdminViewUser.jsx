import UserDetailPage from "../shared/UserDetailPage";
import { PERMISSIONS } from "../../../utils/constants";

const AdminViewUser = () => {
  return <UserDetailPage
    role="ADMIN"
    basePath="/admin/users"
    permissions={PERMISSIONS.ADMIN}
  />;
}

export default AdminViewUser;