import { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { createWord } from "../apis/words";

function CreateWord() {
    const days = useFetch(`${process.env.REACT_APP_API_URL}/days`);
    const history = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
    function onSubmit(e) {
        e.preventDefault();

        if ( !isLoading ) {
            setIsLoading(true);

            createWord(dayRef.current.value, engRef.current.value, korRef.current.value)
            .then(res => {
                if (res.status === 201) {
                    alert("생성이 완료 되었습니다");
                    history(`/day/${dayRef.current.value}`);
                    setIsLoading(false);
                }
            });
        }
    }

    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return (
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Eng</label>
                <input type="text" placeholder="computer" ref={engRef} />
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type="text" placeholder="컴퓨터" ref={korRef} />
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref={dayRef}>
                    {
                        days.map(day => (
                            <option key={day.id} value={day.day}>
                                {day.day}
                            </option>
                        ))
                    }
                </select>
            </div>
            <button
                style={{
                    opacity: isLoading ? 0.3 : 1,
                }}
            >
                {isLoading ? "Saving..." : "저장"}
            </button>
        </form>
    )
}

export default CreateWord;