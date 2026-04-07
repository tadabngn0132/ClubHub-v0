import UsersPage from "../shared/UsersPage";
import { PERMISSIONS } from "../../../utils/constants";

const ModeratorUsers = () => {
  return (
    <UsersPage
      role="MODERATOR"
      basePath="/moderator/users"
      permissions={PERMISSIONS.MODERATOR}
    />
  );
};

export default ModeratorUsers;
