// TODO(member-application): rebuild this as the shared detail page for admin,
// moderator, and member flows. Fetch the application by id, render the
// aggregate profile, CV review, interview history, final review, and withdraw
// status, then expose only the actions allowed by role and transition state.

const MemberApplicationDetailsPage = ({ role }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Member Application Details</h1>
      <p className="text-sm text-slate-300 mb-6">
        Detailed information about the member application will be displayed here.
      </p>
    </div>
  );
};

export default MemberApplicationDetailsPage;
