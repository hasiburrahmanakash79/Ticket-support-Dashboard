import DashboardCard from "./DashboardCard";
import MonthlySummary from "./MonthlySummary";
import RecentTicket from "./RecentTicket";
import RecentUser from "./RecentUser";


const Home = () => {
    return (
        <div>
            <DashboardCard/>
            <div className="py-10 grid grid-cols-2 gap-10">
                <MonthlySummary/>
                <RecentTicket/>
            </div>
            <RecentUser/>
        </div>
    );
};

export default Home;