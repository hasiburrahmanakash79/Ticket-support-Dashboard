import HotDeals from './HotDeals';
import NewDeals from './NewDeals';

const Home = () => {
    return (
        <div className='space-y-5'>
            <HotDeals/>
            <NewDeals/>
        </div>
    );
};

export default Home;