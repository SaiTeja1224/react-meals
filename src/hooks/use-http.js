import { useCallback, useEffect, useRef, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const request = useCallback(async (reqConfig, action) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(reqConfig.url, {
        method: reqConfig.method ? reqConfig.method : "GET",
        headers: reqConfig.headers ? reqConfig.headers : null,
        body: reqConfig.body ? reqConfig.body : null,
      });
      if (!res.ok) {
        throw new Error("Failed to connect");
      }
      const data = await res.json();
      action(data);
      setIsLoading(false);
    } catch (e) {
      setError("Failed to Connect!");
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  }, []);

  return [isLoading, error, request];
};

export default useHttp;
