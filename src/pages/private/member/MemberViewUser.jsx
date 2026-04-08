import UserDetailPage from "../shared/UserDetailPage";
import { PERMISSIONS } from "../../../utils/constants";

const MemberViewUser = () => {
  return <UserDetailPage
    role="MEMBER"
    basePath="/member/users"
    permissions={PERMISSIONS.MEMBER}
  />;
}

export default MemberViewUser;
