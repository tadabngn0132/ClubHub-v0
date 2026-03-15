import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MemberDashboard = () => {
  const dispatch = useDispatch();
  const { currentMember } = useSelector((state) => state.user);

  return <div>MemberDashboard</div>;
};

export default MemberDashboard;
