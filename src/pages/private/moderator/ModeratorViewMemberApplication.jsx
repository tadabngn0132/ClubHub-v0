import MemberApplicationDetailsPage from "../shared/MemberApplicationDetailsPage.jsx";

// TODO(member-application): render the shared detail page in moderator
// context and only surface the review actions that are allowed for this role.

const ModeratorViewMemberApplication = () => {
  return <MemberApplicationDetailsPage role="moderator" />;
};

export default ModeratorViewMemberApplication;
