import { useCallback, useEffect, useState } from "react";

export default function useFetchSolution(initialUrl) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [url, updateUrl] = useState(initialUrl);

    const load = useCallback(async () => {
        setData(null);
        if (!url) {
            setError("Missing URL");
            return;
        } else {
            setError(null);
        }
        setLoading(true);
        try {
            const response = await fetch(initialUrl);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);
            
        } catch (error) {
            setError(error.message);
            setData(null);
        }
        setLoading(null)
    }, [url]);

    useEffect(() => {
        load();
    }, [load]);

    return {
        url,
        loading,
        error,
        data,
        load,
        updateUrl,
    };
}