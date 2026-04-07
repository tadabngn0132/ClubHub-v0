import TaskDetailPage from "../shared/TaskDetailPage";
import { PERMISSIONS } from "../../../utils/constants";

const MemberViewTask = () => {
  return <TaskDetailPage
    role="MEMBER"
    basePath="/member/tasks"
    permissions={PERMISSIONS.MEMBER}
  />;
};

export default MemberViewTask;
