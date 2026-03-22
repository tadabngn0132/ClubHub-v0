import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDepartmentDetails } from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/formatters.js";

const MemberViewDepartment = () => {
  const { departmentId } = useParams();
  const dispatch = useDispatch();
  const { department, isLoading, error } = useSelector(
    (state) => state.department,
  );

  useEffect(() => {
    dispatch(getDepartmentDetails(departmentId));
  }, [dispatch, departmentId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            to="/member/departments"
            className="inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
          >
            Back to Departments
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <section className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.85)] backdrop-blur md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/80">
            Department
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            {department?.name || "Unknown Department"}
          </h1>
          <p className="mt-3 inline-flex rounded-full border border-emerald-400/50 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
            {department?.isActive ? "Active" : "Inactive"}
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-3 text-lg font-bold text-slate-100">Timeline</h2>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                <strong className="text-slate-100">Created At:</strong>{" "}
                {department?.createdAt
                  ? formatDate(department.createdAt)
                  : "N/A"}
              </p>
              <p>
                <strong className="text-slate-100">Updated At:</strong>{" "}
                {department?.updatedAt
                  ? formatDate(department.updatedAt)
                  : "N/A"}
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-3 text-lg font-bold text-slate-100">
              Description
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {department?.description ||
                "No description provided for this department."}
            </p>
          </article>
        </section>
      </div>
    </div>
  );
};

export default MemberViewDepartment;
