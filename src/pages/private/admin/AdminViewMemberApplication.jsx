import MemberApplicationDetailsPage from "../shared/MemberApplicationDetailsPage.jsx";

// TODO(member-application): render the shared detail page in admin context and
// expose the CV / interview / final-review entry points from here once the
// detail screen supports them.

const AdminViewMemberApplication = () => {
  return <MemberApplicationDetailsPage role="admin" />;
};

export default AdminViewMemberApplication;
