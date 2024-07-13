import { Link } from 'react-router-dom';
import './Main.scss';

const Main = () => {



    return (
        <div className="main-component" >
            <div>
                <h1>Welcome to the main screen</h1>
            </div>
            <div>
                <Link to={'/'} >Go to Home Page</Link>
            </div>
        </div>
    )
}


export default Main;