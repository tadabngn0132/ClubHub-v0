import { Link } from "react-router-dom";
import {
  getAllMemberApplicationsList,
  softDeleteMemberApplicationById,
  hardDeleteMemberApplicationById,
  resetMemberApplicationStatus
} from "../../../store/slices/memberApplicationSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";

const AdminMemberApplications = () => {
  const dispatch = useDispatch();
  const { memberApplications, isLoading, error } = useSelector(
    (state) => state.memberApplication,
  );
  const [selectedMemberApplications, setSelectedMemberApplications] = useState(
    [],
  );

  useEffect(() => {
    dispatch(getAllMemberApplicationsList());
  }, [dispatch]);

  const applications = memberApplications || [];
  const selectedCount = selectedMemberApplications.length;
  const isAllSelected =
    applications.length > 0 && selectedCount === applications.length;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedMemberApplications(applications.map((application) => application.id));
      return;
    }

    setSelectedMemberApplications([]);
  };

  const handleSelectOne = (applicationId) => {
    setSelectedMemberApplications((prev) => {
      if (prev.includes(applicationId)) {
        return prev.filter((id) => id !== applicationId);
      }

      return [...prev, applicationId];
    });
  };

  const handleDelete = (applicationId) => {
    const softConfirmed = window.confirm(
      "Do you want to deactivate this member application?",
    );

    if (softConfirmed) {
      dispatch(softDeleteMemberApplicationById(applicationId));
      return;
    }

    const hardConfirmed = window.confirm(
      "Do you want to permanently delete this member application? This action cannot be undone.",
    );

    if (hardConfirmed) {
      dispatch(hardDeleteMemberApplicationById(applicationId));
    }
    dispatch(resetMemberApplicationStatus());
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  const getStatusBadgeClass = (status) => {
    const normalizedStatus = String(status || "").toUpperCase();

    if (normalizedStatus === "PENDING") {
      return "border-amber-500/40 bg-amber-500/20 text-amber-300";
    }

    if (normalizedStatus === "APPROVED") {
      return "border-emerald-500/40 bg-emerald-500/20 text-emerald-300";
    }

    if (normalizedStatus === "REJECTED") {
      return "border-rose-500/40 bg-rose-500/20 text-rose-300";
    }

    return "border-gray-600 bg-gray-700/40 text-gray-300";
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-100 md:text-3xl">
            Member Applications
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {applications.length} member applications | {selectedCount} selected
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/90 shadow-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800 text-sm text-gray-200">
              <thead className="bg-gray-950/80 text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="w-12 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="selectAll"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Application Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {applications.map((application) => {
                  const isSelected = selectedMemberApplications.includes(application.id);

                  return (
                    <tr
                      key={application.id}
                      className={`transition hover:bg-gray-800/60 ${
                        isSelected ? "bg-blue-500/10" : "bg-transparent"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          name="application"
                          id={`application-${application.id}`}
                          checked={isSelected}
                          onChange={() => handleSelectOne(application.id)}
                          className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-100">{application.name || "N/A"}</td>
                      <td className="px-4 py-3 text-gray-300">{application.email || "N/A"}</td>
                      <td className="px-4 py-3 text-gray-300">{application.applicationDate || "N/A"}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusBadgeClass(application.status)}`}
                        >
                          {application.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            to={`/admin/member-applications/view/${application.id}`}
                            className="rounded-md bg-sky-500/15 px-3 py-1.5 text-xs font-medium text-sky-300 transition hover:bg-sky-500/30"
                          >
                            View
                          </Link>
                          <Link
                            to={`/admin/member-applications/interview/${application.id}`}
                            className="rounded-md bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-300 transition hover:bg-blue-500/30"
                          >
                            Interview
                          </Link>
                          <Link
                            to={`/admin/member-applications/final-review/${application.id}`}
                            className="rounded-md bg-green-500/15 px-3 py-1.5 text-xs font-medium text-green-300 transition hover:bg-green-500/30"
                          >
                            Final Review
                          </Link>
                          <button
                            onClick={() => handleDelete(application.id)}
                            className="rounded-md bg-rose-500/15 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/30"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {applications.length === 0 && (
            <div className="border-t border-gray-800 px-4 py-10 text-center text-sm text-gray-400">
              No member applications found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMemberApplications;
