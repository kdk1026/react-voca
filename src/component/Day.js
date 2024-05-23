import { useParams } from "react-router-dom";
import Word from "./Word";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function Day() {
    const { day } = useParams();

    const words = useFetch(`http://localhost:3001/words?day=${day}`);

    const days = useFetch("http://localhost:3001/days");
    const history = useNavigate();

    const currentDay = useFetch(`http://localhost:3001/days?day=${day}`);

    function prev() {
        history(`/day/${Number(day) - 1}`);
    }

    function next() {
        history(`/day/${Number(day) + 1}`);
    }

    function dayDel() {
        const msg = '단어들도 모두 삭제됩니다.\n삭제 하시겠습니까?';

        if ( window.confirm(msg) ) {
            words.forEach((word) => {
                fetch(`http://localhost:3001/words/${word.id}`, {
                    method: 'DELETE'
                })
                .then(res => {
                    if (res.ok) {
                        fetch(`http://localhost:3001/days/${currentDay[0].id}`, {
                            method: 'DELETE'
                        })
                        .then(res => {
                            if (res.ok) {
                                history(`/`);
                            }
                        });
                    }
                })
            });
        }
    }
    
    return (
        <>
            <h2>Day {day}</h2>
            {words.length === 0 && <span>Loading...</span>}
            <table>
                <tbody>
                    {
                        words.map(word => (
                            <Word word={word} key={word.id} />
                        ))
                    }
                </tbody>
            </table>
            <div>
                <button onClick={prev} disabled={day === 1 ? true : false}>이전</button>
                <button onClick={next} disabled={day === days.length ? true : false}>다음</button>
            </div>
            <div>
                <button onClick={dayDel}>Day 삭제</button>
            </div>
        </>
    )
}

export default Day;