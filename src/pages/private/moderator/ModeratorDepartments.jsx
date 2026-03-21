import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDepartmentsList } from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import {
  formatUppercaseToCapitalized,
  formatStatusBadgeColor,
} from "../../../utils/formatters.js";

const ModeratorDepartments = () => {
  const dispatch = useDispatch();
  const { departments, isLoading, error } = useSelector(
    (state) => state.department,
  );

  useEffect(() => {
    dispatch(getDepartmentsList());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const handleStatusLabel = (isActive) => {
    switch (isActive) {
      case true:
        return "Active";
      case false:
        return "Inactive";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
            Departments
          </h1>
          <p className="mt-3 text-slate-300">
            {departments.length} departments
          </p>
        </section>

        {error && (
          <div className="rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/65">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead className="bg-slate-800/95 text-slate-200 backdrop-blur">
                <tr className="border-b border-slate-700 text-left">
                  <th className="px-3 py-3">Name</th>
                  <th className="px-3 py-3">Description</th>
                  <th className="px-3 py-3 text-center">Status</th>
                  <th className="px-3 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {departments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-10 text-center text-slate-300"
                    >
                      No departments found.
                    </td>
                  </tr>
                ) : (
                  departments.map((department) => (
                    <tr
                      key={department.id}
                      className="border-t border-slate-800 odd:bg-slate-900/30 even:bg-slate-800/20 hover:bg-slate-800/50"
                    >
                      <td className="px-3 py-3 font-medium text-slate-100">
                        {department.name}
                      </td>
                      <td
                        className="max-w-[420px] truncate px-3 py-3 text-slate-300"
                        title={department.description}
                      >
                        {department.description || "No description"}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <p
                          className={formatStatusBadgeColor(
                            formatUppercaseToCapitalized(
                              handleStatusLabel(department.isActive),
                            ),
                          )}
                        >
                          {formatUppercaseToCapitalized(
                            handleStatusLabel(department.isActive),
                          )}
                        </p>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1 text-xs">
                          <Link
                            to={`/moderator/departments/view/${department.id}`}
                            className="rounded-md bg-emerald-500/20 px-3 py-1 font-semibold text-emerald-300 transition hover:bg-emerald-500/35"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDepartments;
