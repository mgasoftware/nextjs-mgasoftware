import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Item {
    id: number
    category: number
    created_at: string
    created_by: number
    description: string
    image: string
    is_sold: boolean
    name: string
    price: number
}

export default function useGetDatas(url: string) {
    const [data, setData] = useState<Item[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true)

        axios
            .get<Item[]>(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error: string) => {
                if (axios.isAxiosError(error)) {
                    setError(`error message:  ${error.message}`);
                    return error.message;
                } else {
                    setError(`unexpected error: , ${error}`);
                    return 'An unexpected error occurred';
                }
            })
            .finally(() => {
                setLoading(false);
            })


    }, [url]);

    return { data, loading, error };
}