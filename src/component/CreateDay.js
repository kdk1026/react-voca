import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateDay() {
    const days = useFetch(`${process.env.REACT_APP_API_URL}/days`);
    const history = useNavigate();

    function addDay() {
        axios.post(`${process.env.REACT_APP_API_URL}/days`, {
            day: days.length + 1
        })
        .then(res => {
            if (res.status === 201) {
                alert("생성이 완료 되었습니다");
                history(`/`);
            }
        });
    }

    return (
        <div>
            <h3>현재 일수 : {days.length}일</h3>
            <button onClick={addDay}>Day 추가</button>
        </div>
    )
}

export default CreateDay;