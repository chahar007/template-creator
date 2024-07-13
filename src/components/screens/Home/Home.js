import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {



    return (
        <div className="home-component" >
            <div>
                <h1>Welcome to the home screen</h1>
            </div>
            <div>
                <Link to={'/main'} >Go to Main Page</Link>
            </div>
        </div>
    )
}


export default Home;