import TaskDetailPage from "../shared/TaskDetailPage";
import { PERMISSIONS } from "../../../utils/constants";

const AdminViewTask = () => {
  return <TaskDetailPage
    role="ADMIN"
    basePath="/admin/tasks"
    permissions={PERMISSIONS.ADMIN}
  />;
};

export default AdminViewTask;
