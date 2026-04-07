import ActivitiesPage from "../shared/ActivitiesPage";

const MemberActivities = () => {
  return (
    <ActivitiesPage
      role="member"
      canCreate={false}
      basePath="/member/activities"
    />
  );
};

export default MemberActivities;
