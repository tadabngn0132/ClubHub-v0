import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { logoutUser } from "../../../store/slices/authSlice";

const Dropdown = ({ visible, role, onClose, triggerRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideDropdown =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const clickedTrigger =
        triggerRef?.current && triggerRef.current.contains(event.target);

      if (!clickedInsideDropdown && !clickedTrigger) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, triggerRef]);

  const logout = async () => {
    const resData = await dispatch(logoutUser()).unwrap();

    if (resData.success) {
      console.log(resData.message);
      onClose?.();
      navigate("/sign-in");
    }
  };
  const visibilityClass = visible ? "flex" : "hidden";
  return (
    <div
      ref={dropdownRef}
      className={`absolute right-4 top-15 z-50 w-52 flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900/95 p-1 shadow-xl shadow-black/40 backdrop-blur-sm transition-all duration-200 ${visibilityClass}`}
    >
      <Link
        to={`/${role}/profile`}
        onClick={onClose}
        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors duration-150 hover:bg-slate-800 hover:text-white"
      >
        Profile
      </Link>
      <Link
        to={`/${role}/setting`}
        onClick={onClose}
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
