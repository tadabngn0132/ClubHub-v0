import React from "react";
import { useSelector } from "react-redux";
import ClubCalendarView from "./ClubCalendarView";

const ActivitiesCalendarView = () => {
  const { activities } = useSelector((state) => state.activity);

  return (
    <div className="w-full">
      <ClubCalendarView activities={activities || []} />
    </div>
  );
};

export default ActivitiesCalendarView;
