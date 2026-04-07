import TasksPage from "../shared/TasksPage";
import { PERMISSIONS } from "../../../utils/constants";

const AdminTasks = () => {
  return (
    <TasksPage
      role="ADMIN"
      basePath="/admin/tasks"
      permissions={PERMISSIONS.ADMIN}
    />
  );
};

export default AdminTasks;
