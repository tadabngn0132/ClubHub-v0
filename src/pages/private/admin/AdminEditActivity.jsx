import ActivityForm from "../../../components/main/internal/ActivityForm";
import { useParams } from "react-router-dom";

const AdminEditActivity = () => {
  const { activityId } = useParams();
  console.log("Activity ID from AdminEditActivity:", activityId);
  return (
    <div>
      <ActivityForm mode="edit" activityId={activityId} />
    </div>
  );
};

export default AdminEditActivity;
