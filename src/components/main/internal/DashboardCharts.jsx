import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDashboardStats,
  resetDashboardError,
} from "../../../store/slices/dashboardSlice";
import Loading from "../../layout/internal/Loading";
import toast from "react-hot-toast";
import { Line, LineChart, Bar, BarChart, Pie, PieChart } from "recharts";

const DashboardCharts = () => {
  const dispatch = useDispatch();
  const { stats, isLoading, error } = useSelector((state) => state.dashboard);
  const { userCount, taskCount, eventCount, memberApplicationCount } =
    stats || {};

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message ||
          "An error occurred while fetching dashboard statistics.",
      );
      dispatch(resetDashboardError());
    }
  }, [error, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Dashboard Charts</h2>
    </div>
  );
};

export default DashboardCharts;
