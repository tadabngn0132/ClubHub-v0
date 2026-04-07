import TasksPage from "../shared/TasksPage";
import { PERMISSIONS } from "../../../utils/constants";

const ModeratorTasks = () => {
  return (
    <TasksPage
      role="MODERATOR"
      basePath="/moderator/tasks"
      permissions={PERMISSIONS.MODERATOR}
    />
  );
};

export default ModeratorTasks;
