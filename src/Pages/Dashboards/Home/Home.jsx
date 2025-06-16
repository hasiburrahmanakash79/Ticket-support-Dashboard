import useOverview from "../../../components/hook/useOverview";
import DashboardCard from "./DashboardCard";
import MonthlySummary from "./MonthlySummary";
import RecentTicket from "./RecentTicket";

const Home = () => {
  const { overview, loading } = useOverview([]);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      {!loading && overview && <DashboardCard data={overview} />}


      <div className="py-10 grid grid-cols-2 gap-10">
        <MonthlySummary data={overview} loading={loading} />
        <RecentTicket data={overview} />
      </div>

      {/* <RecentUser /> */}
    </div>
  );
};

export default Home;