import UsersPage from "../shared/UsersPage";
import { PERMISSIONS } from "../../../utils/constants";

const MemberUsers = () => {
  return (
    <UsersPage
      role="MEMBER"
      basePath="/member/users"
      permissions={PERMISSIONS.MEMBER}
    />
  );
};

export default MemberUsers;
