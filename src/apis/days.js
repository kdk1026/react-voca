import axios from "axios";

export const createDay = (daysLength) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/days`, {
        day: daysLength + 1
    });
}

export const deleteDay = (id) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/days/${id}`);
}