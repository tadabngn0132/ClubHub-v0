import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getDepartmentsList } from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import {
  formatUppercaseToCapitalized,
  formatStatusBadgeColor,
} from "../../../utils/formatters.js";
import { USER_STATUS_OPTIONS } from "../../../utils/constants";

const MemberDepartments = () => {
  const dispatch = useDispatch();
  const { departments, isLoading, error } = useSelector(
    (state) => state.department,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name_asc");

  useEffect(() => {
    dispatch(getDepartmentsList());
  }, [dispatch]);

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

  const filteredDepartments = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    let result = [...(departments || [])];

    if (keyword) {
      result = result.filter((department) =>
        [department.name, department.description]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      );
    }

    if (statusFilter !== "all") {
      const expectedActive = statusFilter === "ACTIVE";
      result = result.filter((department) => Boolean(department.isActive) === expectedActive);
    }

    result.sort((a, b) => {
      if (sortBy === "name_desc") {
        return String(b.name || "").localeCompare(String(a.name || ""));
      }
      return String(a.name || "").localeCompare(String(b.name || ""));
    });

    return result;
  }, [departments, searchTerm, statusFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("name_asc");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Departments
          </h1>
          <p className="mt-1 text-slate-300">
            {filteredDepartments.length} departments
          </p>
        </section>

        {error && (
          <div className="rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search department name or description"
            className="md:col-span-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          >
            <option value="all">All Statuses</option>
            {USER_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {formatUppercaseToCapitalized(status)}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          >
            <option value="name_asc">Name: A-Z</option>
            <option value="name_desc">Name: Z-A</option>
          </select>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 hover:border-[var(--pink-color)]"
          >
            Clear Filters
          </button>
        </div>

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
                {filteredDepartments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-10 text-center text-slate-300"
                    >
                      No departments found.
                    </td>
                  </tr>
                ) : (
                  filteredDepartments.map((department) => (
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
                            to={`/member/departments/view/${department.id}`}
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

export default MemberDepartments;
