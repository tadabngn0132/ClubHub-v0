import UserDetailPage from "../shared/UserDetailPage";
import { PERMISSIONS } from "../../../utils/constants";

const ModeratorViewUser = () => {
  return <UserDetailPage
    role="MODERATOR"
    basePath="/moderator/users"
    permissions={PERMISSIONS.MODERATOR}
  />;
}

export default ModeratorViewUser;
