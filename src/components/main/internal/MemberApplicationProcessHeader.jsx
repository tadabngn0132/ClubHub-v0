import { Link } from "react-router-dom";

const MemberApplicationProcessHeader = ({
  headerTitle,
  memberApplication,
  basePath,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
          {headerTitle}
        </h1>
        <p className="mt-1 text-slate-300">
          {memberApplication?.fullname || "N/A"} -{" "}
          {memberApplication?.email || "N/A"}
        </p>
      </div>

      <Link
        to={basePath}
        className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 hover:border-[var(--pink-color)]"
      >
        Back To List
      </Link>
    </div>
  );
};

export default MemberApplicationProcessHeader;
