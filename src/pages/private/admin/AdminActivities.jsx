import ActivitiesPage from "../shared/ActivitiesPage";

const AdminActivities = () => {
  return (
    <ActivitiesPage
      role="admin"
      canCreate={true}
      basePath="/admin/activities"
    />
  );
};

export default AdminActivities;
