// TODO(member-application): rebuild this as the main application list screen.
// It should support search, state filters, sort options, bulk actions, state
// badges, and links to the detail page. Keep the list driven by the aggregate
// state field instead of legacy cv/final flat fields.

const MemberApplicationsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Member Applications</h1>
      <p className="text-sm text-slate-300 mb-6">
        List of all member applications will be displayed here.
      </p>
    </div>
  );
};

export default MemberApplicationsPage;
