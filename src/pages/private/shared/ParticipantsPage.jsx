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
import Loading from "../../../components/layout/internal/Loading"

const ParticipantsPage = () => {
  // TODO: Implement participants page to  handle check-in and attendance tracking for activities using QR codes and manual check-in options by activity participation slice. This page will allow activity organizers to manage participant lists, track attendance, and generate reports for events.
    const dispatch = useDispatch();
  const { activityId } = useParams();
  const { participations, isLoading, error } = useSelector((state) => state.activityParticipation);

  useEffect(() => {
    dispatch(getActivityParticipationsByActivityId(activityId));
  }, [dispatch, activityId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetActivityParticipationError());
    }
  }, [error]);

  const statsCards = [
    { title: "Total Participants", value: participations.length },
    { title: "Checked-In", value: participations.filter(p => p.status === 'checked-in').length },
    { title: "No-Shows", value: participations.filter(p => p.status === 'no-show').length },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Participants Page</h1>
      <p>This is the participants page for managing activity participants.</p>
      {/* Stats Cards: Total Participants, Checked-In, No-Shows */}
      <div>
        {statsCards.map((card, index) => (
          <div key={index}>
            <h2>{card.title}</h2>
            <p>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Dropdown: All, Registered, Checked-In, No-Shows, Cancelled */}
      <select>
        <option value="all">All</option>
        <option value="registered">Registered</option>
        <option value="checked-in">Checked-In</option>
        <option value="no-show">No-Shows</option>
        <option value="cancelled">Cancelled</option>
      </select>

      {/* Search Bar (Search by name or email) */}
      <input type="text" placeholder="Search by name or email..." />

      {/* Bulk Actions */}
      <div>
        <button>Mark as Attended</button>
        <button>Mark as Absent</button>
        <button>Reset Status</button>
      </div>

      {/* Export CSV */}
      <button>Export CSV</button>

      {/* Participant Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participations.map((participation) => (
            <tr key={participation.id}>
              <td>{participation.participantName}</td>
              <td>{participation.participantEmail}</td>
              <td>{participation.status}</td>
              <td>
                <button onClick={() => dispatch(checkInActivityParticipant(participation.id))}>
                  Attended
                </button>
                <button onClick={() => dispatch(markActivityParticipantNoShow(participation.id))}>
                  Absent
                </button>
                <button onClick={() => dispatch(resetActivityParticipantStatus(participation.id))}>
                  Reset Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsPage;
