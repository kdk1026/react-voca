import { useEffect, useState } from "react";
import axios from 'axios';

function useFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(url);
            setData(res.data);
        }
        fetchData();
    }, [url]);

    return data;
}

export default useFetch;