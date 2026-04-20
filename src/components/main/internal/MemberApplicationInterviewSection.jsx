import MemberApplicationInterviewCard from "./MemberApplicationInterviewCard.jsx";

const MemberApplicationInterviewSection = ({
  canInterview,
  isSubmitting,
  deptApplications,
  statusOptions,
  onSubmitInterview,
  normalizeStatus,
}) => {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
      {!canInterview && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-2 text-sm text-amber-200">
          Interview round is locked. CV review must be PASSED first.
        </div>
      )}

      {deptApplications.length === 0 ? (
        <p className="text-sm text-slate-300">
          No department choices found for this application.
        </p>
      ) : (
        deptApplications.map((deptApp) => {
          return (
            <MemberApplicationInterviewCard
              key={deptApp.id}
              deptApp={deptApp}
              canInterview={canInterview}
              isSubmitting={isSubmitting}
              statusOptions={statusOptions}
              normalizeStatus={normalizeStatus}
              onSubmitInterview={onSubmitInterview}
            />
          );
        })
      )}
    </div>
  );
};

export default MemberApplicationInterviewSection;
