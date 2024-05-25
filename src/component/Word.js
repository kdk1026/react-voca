import axios from "axios";
import { useState } from "react";

function Word({ word: w }) {
    /*
        function Word(props) {
            const [word, setWord] = useState(props.word);
        }
    */
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);

    function toggleShow() {
        setIsShow(!isShow);
    }

    function toggleDone() {
        axios.put(`${process.env.REACT_APP_API_URL}/words/${word.id}`, {
            ...word,
            isDone: !isDone,
        })
        .then(res => {
            if (res.status === 200) {
                setIsDone(!isDone);
            }
        })
    }

    function del() {
        if ( window.confirm('삭제 하시겠습니까?') ) {
            axios.delete(`${process.env.REACT_APP_API_URL}/words/${word.id}`)
            .then(res => {
                if (res.status === 200) {
                    setWord({ id: 0 });
                }
            })
        }
    }

    if (word.id === 0) {
        return null;
    }

    return (
        <tr className={isDone ? 'off' : ''}>
            <td>
                <input type="checkbox" defaultChecked={isDone} onChange={toggleDone} />
            </td>
            <td>{word.eng}</td>
            <td>{isShow && word.kor}</td>
            <td>
                <button onClick={toggleShow}>
                    뜻 {isShow ? '숨기기' : '보기'}
                </button>
                <button onClick={del} className="btn_del">삭제</button>
            </td>
        </tr>
    )
}

export default Word;