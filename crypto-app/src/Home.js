import { Link } from 'react-router-dom';
import './index.css'

function Home() {
    return (
        <div className='container'>
            <h1>KoinX Intern Screening Tasks</h1>
            <div>
                <Link to="/task1"><button>Task 1</button></Link>
                <Link to="/task2"><button>Task 2</button></Link>
                <Link to="/task3"><button>Task 3</button></Link>
            </div>
        </div>
    );
}

export default Home;
