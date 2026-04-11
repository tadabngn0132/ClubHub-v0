import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLock,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const Forbidden = ({ role }) => {
  const normalizedRole = (role || "").toLowerCase();

  const navLink = (currentRole) => {
    switch (currentRole.toLowerCase()) {
      case "admin":
        return "/admin/dashboard";
      case "moderator":
        return "/moderator/dashboard";
      case "member":
        return "/member/dashboard";
      default:
        return "/";
    }
  };

  const dashboardPath = navLink(normalizedRole);
  const roleLabel = normalizedRole
    ? normalizedRole.charAt(0).toUpperCase() + normalizedRole.slice(1)
    : "Guest";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(219,63,122,0.24),_transparent_42%),linear-gradient(180deg,_#09090b_0%,_#111113_100%)] px-4 py-12 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px] opacity-20" />
      <div className="absolute left-8 top-10 h-44 w-44 rounded-full bg-[#DB3F7A]/20 blur-3xl" />
      <div className="absolute bottom-8 right-8 h-56 w-56 rounded-full bg-[#6b2c51]/25 blur-3xl" />

      <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-[#DB3F7A]/30 bg-[#DB3F7A]/12 text-[#ff7eab] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            <FontAwesomeIcon icon={faLock} className="text-3xl" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              403 Forbidden
            </h1>
            <p className="max-w-xl text-sm leading-6 text-white/68 sm:text-base">
              You do not have permission to access this resource with your
              current role.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 rounded-2xl border border-white/10 bg-black/25 p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              Access denied
            </p>
            <p className="mt-2 text-sm font-medium text-white/85">
              This page is restricted for your account.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">
              Recommended action
            </p>
            <p className="mt-2 text-sm font-medium text-white/85">
              Return to the dashboard or contact an administrator.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to={dashboardPath}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#DB3F7A] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(219,63,122,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f04a87]"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Dashboard
          </Link>
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-sm font-semibold text-white/65">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            Access Restricted
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
