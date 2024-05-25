import { Link} from "react-router-dom";
import useFetch from "../hooks/useFetch";

function DayList() {
    const days = useFetch(`${process.env.REACT_APP_API_URL}/days`);

    if (days.length === 0) {
        return <span>Loading...</span>
    }

    return (
        <ul className="list_day">
            {
                days.map(day => (
                    <li key={day.id}>
                        <Link to={`/day/${day.day}`}>Day {day.day}</Link>
                    </li>
                ))
            }
        </ul>
    );
}

export default DayList;