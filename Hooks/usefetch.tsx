"use client"
import { useEffect, useState } from "react"

interface Props {
    url: string
}

export default function useFetch<T>({ url }: Props) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = (await response.json()) as T;
                setData(result);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url])

    return { data, loading, error };
}
