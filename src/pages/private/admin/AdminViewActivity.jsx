import ActivityDetailPage from "../shared/ActivityDetailPage";
import { PERMISSIONS } from "../../../utils/constants";

const AdminViewActivity = () => {
  return <ActivityDetailPage 
    role="ADMIN" 
    basePath="/admin/activities" 
    permissions={PERMISSIONS.ADMIN} 
  />;
};

export default AdminViewActivity;