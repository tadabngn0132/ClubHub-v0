import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faInbox,
  faInfoCircle,
  faBars,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logos/GDC_logo.svg";
import Dropdown from "./Dropdown";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  formatRoleBadgeColor,
  formatUppercaseToCapitalized,
  formatUppercaseToLowercase,
} from "../../../utils/formatters";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../../hooks/useSocket";
import { getUserNotifications } from "../../../store/slices/notificationSlice";

const Header = ({ role, onHandleSideBarToggle }) => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  const { onEvent, emitEventWithAck } = useSocket(token);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
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

  const handleMarkAsRead = async (notificationId) => {
    const ack = await emitEventWithAck("notification:read", notificationId);

    if (!ack?.success) {
      console.error("Mark notification as read failed", ack?.message);
    }

    if (currentUser?.id) {
      dispatch(getUserNotifications(currentUser.id));
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    const ack = await emitEventWithAck("notification:softDelete", {
      notificationId,
    });

    if (!ack?.success) {
      console.error("Soft delete notification failed", ack?.message);
    }

    if (currentUser?.id) {
      dispatch(getUserNotifications(currentUser.id));
    }
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
          <Link className="hover:opacity-75" to="/">
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
            <div className="absolute right-0 top-7 z-[1200] w-80 overflow-hidden rounded-xl border border-white/15 bg-[#0f0f11] shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="text-sm font-semibold text-white">
                  Notifications
                </p>
                <span className="text-xs text-white/55">
                  {unreadCount} unread
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {Array.isArray(notifications) && notifications.length > 0 ? (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`border-b border-white/8 px-4 py-3 ${
                        item?.isRead ? "bg-transparent" : "bg-[#DB3F7A]/8"
                      }`}
                    >
                      <p className="text-sm leading-5 text-white/85">
                        {item?.message || "You have a new notification."}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] text-white/45">
                          {item?.createdAt
                            ? new Date(item.createdAt).toLocaleString()
                            : "Now"}
                        </span>
                        <div className="flex items-center gap-2">
                          {!item?.isRead && (
                            <button
                              type="button"
                              onClick={() => handleMarkAsRead(item.id)}
                              className="inline-flex items-center gap-1 rounded-md border border-green-500/40 px-2 py-1 text-[11px] text-green-400 hover:bg-green-500/10"
                            >
                              <FontAwesomeIcon icon={faCheck} size="xs" />
                              Read
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteNotification(item.id)}
                            className="inline-flex items-center gap-1 rounded-md border border-red-500/40 px-2 py-1 text-[11px] text-red-400 hover:bg-red-500/10"
                          >
                            <FontAwesomeIcon icon={faTrash} size="xs" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-6 text-center text-sm text-white/55">
                    No notifications yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Messages icon */}
        {/* <FontAwesomeIcon icon={faInbox} className="cursor-pointer" /> */}
        {/* Help icon */}
        {/* <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer" /> */}

        {/* User menu dropdown - Hiện tại chưa triển khai */}
        <div
          onClick={toggleDropdown}
          className="cursor-pointer rounded-full overflow-hidden"
        >
          <img
            className="w-8 h-8"
            src={currentUser?.avatarUrl || null}
            alt="Avatar"
          />
        </div>
        <Dropdown visible={isDropdownVisible} role={formatUppercaseToLowercase(currentUser?.userPosition?.[0]?.position?.systemRole)} />
      </div>
    </div>
  );
};

export default Header;
