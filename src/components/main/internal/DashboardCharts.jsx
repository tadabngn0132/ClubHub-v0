import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats, resetDashboardError } from "../../../store/slices/dashboardSlice";
import Loading from "../../layout/internal/Loading";
import toast from "react-hot-toast";
import { Line, LineChart, Bar, BarChart, Pie, PieChart } from "recharts";

const DashboardCharts = () => {
  const dispatch = useDispatch();
  const { dashboardStats, isLoading, error } = useSelector((state) => state.dashboard);
  const {
    totalUsers,
    activeUsers,
    memberGrowth,
    activitiesThisMonth,
    upcomingEvents,
    activityGrowth,
    pendingTasks,
    overdueTasks,
    cfCompletionRate,
    /**
     * monthlyAttendance: [
     *  { month: "Jan", registered: 20, checkedIn: 15 }, ...
     * ]
     */
    monthlyAttendance,
    /**
     * membersByMonth: [
     *  { month: "Jan", new: 3, total: 45 }, ...
     * ]
     */
    membersByMonth,
    pendingMemberApplications,
  } = dashboardStats || {};

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetDashboardError());
    }
  }, [error, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Dashboard Charts</h2>
      {/* Charts section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Example Line Chart for Monthly Attendance */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Monthly Attendance</h3>
          <LineChart width={400} height={300} data={monthlyAttendance}>
            <Line type="monotone" dataKey="registered" stroke="#8884d8" />
            <Line type="monotone" dataKey="checkedIn" stroke="#82ca9d" />
          </LineChart>
        </div>

        {/* Example Bar Chart for Member Growth */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Member Growth</h3>
          <BarChart width={400} height={300} data={membersByMonth}>
            <Bar dataKey="new" fill="#8884d8" />
            <Bar dataKey="total" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Example Pie Chart for CF Completion Rate */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-2">CF Completion Rate</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={[
                { name: "Completed", value: cfCompletionRate?.completed || 0 },
                { name: "Pending", value: cfCompletionRate?.pending || 0 },
                { name: "Rejected", value: cfCompletionRate?.rejected || 0 },
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
          </PieChart>
        </div>
      </section>

      {/* List section */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Pending Member Applications</h3>
        {pendingMemberApplications?.length === 0 ? (
          <p className="text-sm text-gray-500">No pending applications.</p>
        ) : (
          <ul className="list-disc list-inside">
            {pendingMemberApplications?.map((application) => (
              <li key={application.id} className="text-sm">
                {application.applicantName} - {application.clubName}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default DashboardCharts