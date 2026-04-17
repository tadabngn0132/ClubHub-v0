import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/slices/authSlice";

const Dropdown = ({ visible, role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    const resData = await dispatch(logoutUser()).unwrap();

    if (resData.success) {
      console.log(resData.message);
      navigate("/sign-in");
    }
  };
  const visibilityClass = visible ? "flex" : "hidden";
  return (
    <div
      className={`absolute right-4 top-13 z-50 w-52 flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900/95 p-1 shadow-xl shadow-black/40 backdrop-blur-sm transition-all duration-200 ${visibilityClass}`}
    >
      <Link
        to={`/${role}/profile`}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-150 hover:bg-slate-800 hover:text-white"
      >
        Profile
      </Link>
      <Link
        to={`/${role}/setting`}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-150 hover:bg-slate-800 hover:text-white"
      >
        Settings
      </Link>
      <div className="my-1 h-px bg-slate-700" />
      <button
        onClick={logout}
        className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-rose-300 transition-colors duration-150 hover:bg-rose-500/15 hover:text-rose-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Dropdown;
