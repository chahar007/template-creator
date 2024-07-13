import { Link } from 'react-router-dom';
import './Splash.scss';

const Splash = () => {

    console.log("splash")


    return (
        <div className="main-component" >
            <div>
                <h1>Welcome to the Splash screen</h1>
            </div>
            <div>
                <Link to={'/home'} >Go to Home Page</Link>
            </div>
        </div>
    )
}


export default Splash;