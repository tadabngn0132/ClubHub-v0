import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ModeratorDashboard = () => {
  const dispatch = useDispatch();
  const { currentMember } = useSelector((state) => state.user);

  return <div>ModeratorDashboard</div>;
};

export default ModeratorDashboard;
