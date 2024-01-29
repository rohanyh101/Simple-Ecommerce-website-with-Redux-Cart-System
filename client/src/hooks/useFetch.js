// import { useEffect, useState } from "react";
// import { makeRequest } from "../makeRequest";

// const useFetch = (url) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 // `/products?populate=*&[filters][type][$eq]=${type}`
//                 // import.meta.env.VITE_REACT_APP_API_URL + `/products?populate=*&[filters][type][$eq]=${type}`
//                 const res = await makeRequest.get(url);
//                 setData(res.data.data);
//             } catch (error) {
//                 setError(true);
//             }
//             setLoading(false);
//         };

//         fetchData();
//     }, [url]);

//     return {
//         data,
//         loading,
//         error,
//     };
// };

// export default useFetch;

import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await makeRequest.get(url);
                setData(res.data.data);
            } catch (err) {
                setError(true);
            }
            setLoading(false);
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
