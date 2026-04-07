import TasksPage from "../shared/TasksPage";
import { PERMISSIONS } from "../../../utils/constants";

const MemberTasks = () => {
  return (
    <TasksPage
      role="MEMBER"
      basePath="/member/tasks"
      permissions={PERMISSIONS.MEMBER}
    />
  );
};

export default MemberTasks;
