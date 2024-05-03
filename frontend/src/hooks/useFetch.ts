import { useState, useEffect } from 'react';
import { ax } from '../config/default';
export default function useFetch(url: string) {
  const [data, setDate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }
    const request = ax.CancelToken.source();
    (async function () {
      try {
        setLoading(true);
        let req = await ax.get(url, {cancelToken: request.token});
        setDate(req.data);
      } catch (error: any) {
        setError(error.response);
      } finally {
        setLoading(false);
      }
    })();
    return () => request.cancel();
  }, [url]);

  return { data, loading, error };
}
