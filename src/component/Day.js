import { useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import Word from "./Word";

export default function Day() {
    const {day} = useParams();
    let words = useFetch(`http://localhost:3001/words?day=${day}`);

    const history = useNavigate();
    const days = useFetch("http://localhost:3001/days");
    const [isReload, setIsReLoad] = useState(false);

    function onPrev() {
        history(`/day/${Number(day) - 1}`);
    }

    function onNext() {
        history(`/day/${Number(day) + 1}`);
    }

    function onDel() {
        const msg = '단어들도 모두 삭제됩니다.\n삭제 하시겠습니까?';

        if (window.confirm(msg)) {
            words.forEach((word) => {
                fetch(`http://localhost:3001/words/${word.id}`, {
                    method : 'DELETE',
                })
                .then(res => {
                    if (res.ok) {
                    }
                })
            });

            setIsReLoad(true);

            fetch(`http://localhost:3001/days/${day}`, {
                method : 'DELETE',
            })
            .then(res => {
                if (res.ok) {
                    history(`/`);
                }               
            });
        }
    }

    if (isReload) {
        words = [];
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
        <button onClick={onPrev} disabled={day == 1 ? true : false}>이전</button>
        <button onClick={onNext} disabled={day == days.length ? true : false}>다음</button>
        <button className="btn_del" onClick={onDel}>Day 삭제</button>
        </>
    );
}