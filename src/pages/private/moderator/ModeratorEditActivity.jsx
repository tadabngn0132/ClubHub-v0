import ActivityForm from "../../../components/main/internal/ActivityForm";
import { useParams } from "react-router-dom";

const ModeratorEditActivity = () => {
  const { activityId } = useParams();
  console.log("Activity ID from ModeratorEditActivity:", activityId);
  return (
    <div>
      <ActivityForm mode="edit" activityId={activityId} />
    </div>
  );
};

export default ModeratorEditActivity;
