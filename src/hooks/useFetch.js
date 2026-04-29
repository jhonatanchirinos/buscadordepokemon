import { useState, useEffect } from "react";

function useFetch(fetcherFn) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setHasError(false);

    fetcherFn(controller.signal)
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setHasError(true);
          setIsLoading(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { data, isLoading, hasError };
}

export default useFetch;
