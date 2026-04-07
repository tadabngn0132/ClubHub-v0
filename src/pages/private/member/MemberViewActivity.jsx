import ActivityDetailPage from "../shared/ActivityDetailPage";
import { PERMISSIONS } from "../../../utils/constants";

const MemberViewActivity = () => {
  return <ActivityDetailPage 
    role="MEMBER" 
    basePath="/member/activities" 
    permissions={PERMISSIONS.MEMBER} 
  />;
};

export default MemberViewActivity;
