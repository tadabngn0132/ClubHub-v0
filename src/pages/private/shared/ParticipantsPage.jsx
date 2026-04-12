import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkInActivityParticipant,
  markActivityParticipantNoShow,
  getActivityParticipationsByActivityId,
  resetActivityParticipantStatus,
  resetActivityParticipationError,
} from "../../../store/slices/activityParticipationSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ParticipantsPage = () => {
  // TODO: Implement participants page to  handle check-in and attendance tracking for activities using QR codes and manual check-in options by activity participation slice. This page will allow activity organizers to manage participant lists, track attendance, and generate reports for events.
  return <div>ParticipantsPage</div>;
};

export default ParticipantsPage;
