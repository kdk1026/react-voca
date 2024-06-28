import axios from "axios";

export const createWord = (day, eng, kor) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/words`, {
        day: day,
        eng: eng,
        kor: kor,
        isDone: false
    });
}

export const deleteWord = (id) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/words/${id}`);
}