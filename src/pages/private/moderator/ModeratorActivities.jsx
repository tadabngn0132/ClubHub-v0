import ActivitiesPage from "../shared/ActivitiesPage";

const ModeratorActivities = () => {
  return (
    <ActivitiesPage
      role="moderator"
      canCreate={true}
      basePath="/moderator/activities"
    />
  );
};

export default ModeratorActivities;
