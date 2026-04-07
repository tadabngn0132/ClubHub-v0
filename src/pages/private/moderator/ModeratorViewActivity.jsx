import ActivityDetailPage from "../shared/ActivityDetailPage";
import { PERMISSIONS } from "../../../utils/constants";

const ModeratorViewActivity = () => {
  return <ActivityDetailPage 
    role="MODERATOR" 
    basePath="/moderator/activities" 
    permissions={PERMISSIONS.MODERATOR} 
  />;
};

export default ModeratorViewActivity;
