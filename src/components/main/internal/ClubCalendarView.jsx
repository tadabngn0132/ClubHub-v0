import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendarDays,
  faClock,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

/**
 * ClubCalendarView - Hiển thị lịch hoạt động của câu lạc bộ
 * Render activities từ DB thành lịch tháng/tuần
 */
const ClubCalendarView = ({ activities = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Format date to YYYY-MM-DD
  const formatDateKey = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Get month calendar grid
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);

    const firstDayOfWeek = firstDay.getDay();
    const lastDateOfMonth = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();

    const days = [];

    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevLastDate - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= lastDateOfMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  // Group activities by date
  const activitiesByDate = useMemo(() => {
    const map = {};
    activities.forEach((activity) => {
      const dateKey = formatDateKey(new Date(activity.startDate));
      if (!map[dateKey]) {
        map[dateKey] = [];
      }
      map[dateKey].push(activity);
    });
    return map;
  }, [activities]);

  // Get activities for selected date
  const selectedDateActivities = useMemo(() => {
    if (!selectedDate) return [];
    const dateKey = formatDateKey(selectedDate);
    return activitiesByDate[dateKey] || [];
  }, [selectedDate, activitiesByDate]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
    setSelectedDate(null);
  };

  const handleDayClick = (day) => {
    setSelectedDate(day.date);
  };

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">{monthYear}</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="rounded-lg border border-gray-700 bg-gray-800 p-2 text-gray-300 hover:border-gray-600 hover:text-white transition"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            onClick={handleNextMonth}
            className="rounded-lg border border-gray-700 bg-gray-800 p-2 text-gray-300 hover:border-gray-600 hover:text-white transition"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          {/* Weekday headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {weekDays.map((day) => (
              <div
                key={day}
                className="rounded-lg bg-gray-800 py-2 text-center text-xs font-semibold text-gray-400"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, idx) => {
              const dateKey = formatDateKey(day.date);
              const dayActivities = activitiesByDate[dateKey] || [];
              const isSelected =
                selectedDate && formatDateKey(selectedDate) === dateKey;
              const isToday =
                new Date().toDateString() === day.date.toDateString();

              return (
                <button
                  key={idx}
                  onClick={() => handleDayClick(day)}
                  className={`min-h-20 rounded-lg border p-1.5 text-left text-xs transition ${
                    isSelected
                      ? "border-pink-500 bg-pink-500/20"
                      : isToday
                        ? "border-blue-500 bg-blue-500/10"
                        : day.isCurrentMonth
                          ? "border-gray-700 bg-gray-800 hover:border-gray-600"
                          : "border-gray-800 bg-gray-950 text-gray-600"
                  }`}
                >
                  <p
                    className={`font-semibold ${day.isCurrentMonth ? "text-white" : "text-gray-600"}`}
                  >
                    {day.date.getDate()}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-0.5">
                    {dayActivities.slice(0, 2).map((activity, i) => (
                      <div
                        key={i}
                        className="rounded bg-pink-500/30 px-1 py-0.5 text-xs text-pink-200 line-clamp-1"
                        title={activity.title}
                      >
                        {activity.title.substring(0, 8)}...
                      </div>
                    ))}
                    {dayActivities.length > 2 && (
                      <div className="text-xs text-gray-400">
                        +{dayActivities.length - 2}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Selected date details */}
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <div className="mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDays} className="text-pink-400" />
            <span className="text-sm font-semibold text-gray-300">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })
                : "Select a date"}
            </span>
          </div>

          {selectedDate ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {selectedDateActivities.length > 0 ? (
                selectedDateActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-lg border border-gray-600 bg-gray-900 p-2.5 hover:border-pink-500 transition"
                  >
                    <p className="text-xs font-semibold text-pink-200 line-clamp-2">
                      {activity.title}
                    </p>
                    <div className="mt-2 space-y-1 text-xs text-gray-400">
                      {activity.startDate && (
                        <div className="flex items-center gap-1.5">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="w-3 text-gray-500"
                          />
                          <span>
                            {new Date(activity.startDate).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              },
                            )}
                          </span>
                        </div>
                      )}
                      {activity.venueName && (
                        <div className="flex items-center gap-1.5">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="w-3 text-gray-500"
                          />
                          <span className="line-clamp-1">
                            {activity.locationType ? activity.venueName : "Online"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-gray-500">
                  No activities scheduled
                </p>
              )}
            </div>
          ) : (
            <p className="text-center text-xs text-gray-500">
              Click on a date to view activities
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubCalendarView;
