import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logos/GDC_logo.svg";
import Dropdown from "./Dropdown";
import Notification from "../../main/internal/Notification";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  formatRoleBadgeColor,
  formatUppercaseToCapitalized,
  formatUppercaseToLowercase,
} from "../../../utils/formatters";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../hooks/useSocket";
import { getUserNotifications } from "../../../store/slices/notificationSlice";
import { getUserRole } from "../../../utils/helper";

const Header = ({ role, onHandleSideBarToggle }) => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  const { onEvent } = useSocket(token);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownTriggerRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    if (!currentUser?.id) return;

    dispatch(getUserNotifications(currentUser.id));
  }, [dispatch, currentUser?.id]);

  useEffect(() => {
    const unsubscribe = onEvent("notification:receive", () => {
      if (currentUser?.id) {
        dispatch(getUserNotifications(currentUser.id));
      }
    });

    return () => unsubscribe();
  }, [onEvent, dispatch, currentUser?.id]);

  useEffect(() => {
    const unsubscribeRead = onEvent("notification:read", () => {
      if (currentUser?.id) {
        dispatch(getUserNotifications(currentUser.id));
      }
    });

    const unsubscribeDelete = onEvent("notification:delete", () => {
      if (currentUser?.id) {
        dispatch(getUserNotifications(currentUser.id));
      }
    });

    return () => {
      unsubscribeRead();
      unsubscribeDelete();
    };
  }, [onEvent, dispatch, currentUser?.id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = useMemo(() => {
    if (!Array.isArray(notifications)) {
      return 0;
    }

    return notifications.filter((item) => !item?.isRead).length;
  }, [notifications]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/95 p-4 pb-3 pt-3 shadow-md backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={onHandleSideBarToggle}
          className="inline-flex w-6 items-center justify-center rounded-lg text-white/90 transition hover:bg-white/10 hover:text-white cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        {/* Logo */}
        <div className="flex items-start-safe">
          <Link className="hover:opacity-75" to={`/${role}/dashboard`}>
            <img
              className="w-15.5 sm:w-17.5 md:w-22 lg:w-24.5"
              src={logo}
              alt="GDC Logo"
            />
          </Link>
          <div
            className={`flex badge ${formatRoleBadgeColor(role)} h-fit items-center-safe justify-center-safe p-1 px-3 rounded-2xl text-sm/tight`}
          >
            {formatUppercaseToCapitalized(role)}
          </div>
        </div>
      </div>

      {/* Global search bar - Hiện tại chưa triển khai */}

      {/* Notifications, messages, user menu dropdown */}
      <div className="flex items-center gap-4">
        {/* Notification icon */}
        <div ref={notificationRef} className="relative">
          <button
            type="button"
            onClick={() => setIsNotificationOpen((prev) => !prev)}
            className="relative cursor-pointer"
          >
            <FontAwesomeIcon icon={faBell} />
            {unreadCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#DB3F7A] px-1 text-[10px] font-semibold leading-none text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 top-7 z-[1200] w-80">
              <Notification />
            </div>
          )}
        </div>
        {/* Messages icon */}
        {/* <FontAwesomeIcon icon={faInbox} className="cursor-pointer" /> */}
        {/* Help icon */}
        {/* <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer" /> */}

        {/* User menu dropdown - Hiện tại chưa triển khai */}
        <button
          type="button"
          ref={dropdownTriggerRef}
          onClick={toggleDropdown}
          aria-haspopup="menu"
          aria-expanded={isDropdownVisible}
          className="cursor-pointer overflow-hidden"
        >
          {currentUser?.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt="Avatar"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 text-xl font-bold text-pink-100"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 text-xl font-bold text-pink-100">
              {(currentUser?.fullname || "").slice(0, 1).toUpperCase()}
            </div>
          )}
        </button>
        <Dropdown
          visible={isDropdownVisible}
          role={formatUppercaseToLowercase(getUserRole(currentUser))}
          onClose={() => setIsDropdownVisible(false)}
          triggerRef={dropdownTriggerRef}
        />
      </div>
    </div>
  );
};

export default Header;
