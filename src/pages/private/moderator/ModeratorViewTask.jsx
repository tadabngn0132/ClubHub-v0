import TaskDetailPage from "../shared/TaskDetailPage";
import { PERMISSIONS } from "../../../utils/constants";

const ModeratorViewTask = () => {
  return <TaskDetailPage
    role="MODERATOR"
    basePath="/moderator/tasks"
    permissions={PERMISSIONS.MODERATOR}
  />;
};

export default ModeratorViewTask;
