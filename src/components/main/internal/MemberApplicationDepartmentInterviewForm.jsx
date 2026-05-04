// TODO(member-application): rebuild this form to manage one or many
// department interview records, including interviewer, department, notes,
// decision, and validation of the current workflow stage.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMemberApplicationDepartmentInterview } from "../../../store/slices/memberApplicationSlice";
import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";
import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

const MemberApplicationDepartmentInterviewForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { applicationId } = useParams();
  const [searchParams] = useSearchParams();
  const departmentId = searchParams.get("departmentId");
  const departmentName = searchParams.get("departmentName");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "pending",
      interviewComment: "",
      interviewerId: currentUser ? currentUser.id : null,
      departmentId: departmentId ? Number(departmentId) : null,
    },
  });

  const handleUpdateDepartmentInterview = async (data) => {
    await dispatch(
      updateMemberApplicationDepartmentInterview({
        id: applicationId,
        departmentInterviewData: data,
      }),
    ).unwrap();
    navigate(`/admin/member-applications/view/${applicationId}`);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 flex items-center gap-3">
          <Link
            to={`/admin/member-applications/view/${applicationId}`}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/80 transition hover:border-pink-400/60 hover:text-white"
          >
            Back
          </Link>
        </div>

        <section className="rounded-2xl border border-white/10 bg-zinc-950/75 p-5 sm:p-6">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl mb-6">
            {departmentName} Interview
          </h1>

          <form
            onSubmit={handleSubmit(handleUpdateDepartmentInterview)}
            className="space-y-5"
          >
            {/* Status selection field */}
            <div className="flex flex-col">
              <label
                htmlFor="status"
                className="text-sm font-semibold text-white/90 mb-2"
              >
                Status <span className="text-rose-400">*</span>
              </label>
              <select
                id="status"
                {...register("status", {
                  required: VALIDATION_MESSAGES.interviewStatusRequired,
                  validate: (value) =>
                    ["passed", "failed"].includes(value) ||
                    VALIDATION_MESSAGES.interviewStatusValueRequired,
                })}
                className="rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm text-white/90 transition focus:border-violet-400/50 focus:outline-none focus:ring-1 focus:ring-violet-400/30"
              >
                <option value="pending">Pending</option>
                <option value="passed">Passed</option>
                <option value="failed">Failed</option>
              </select>
              {errors.status && (
                <span className="mt-1.5 text-xs text-rose-400 font-medium">
                  {errors.status.message}
                </span>
              )}
            </div>

            {/* Comment field */}
            <div className="flex flex-col">
              <label
                htmlFor="interviewComment"
                className="text-sm font-semibold text-white/90 mb-2"
              >
                Comments
              </label>
              <textarea
                id="interviewComment"
                rows={6}
                {...register("interviewComment")}
                placeholder="Enter interview comments here..."
                className="rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white/90 placeholder:text-white/40 transition focus:border-violet-400/50 focus:outline-none focus:ring-1 focus:ring-violet-400/30 resize-none"
              />
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-violet-400/35 bg-violet-400/10 px-6 py-2.5 text-sm font-medium text-violet-100 transition hover:bg-violet-400/20 active:bg-violet-400/25"
              >
                Submit Interview
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 active:bg-white/15"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MemberApplicationDepartmentInterviewForm;
