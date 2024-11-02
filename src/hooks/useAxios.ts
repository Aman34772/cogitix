import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface UseAxiosProps {
  url: string;
  config?: AxiosRequestConfig;
}

export const useAxios = <T>({ url, config }: UseAxiosProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<T>(
          `https://rickandmortyapi.com/api/${url}`,
          config
        );
        setData(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return { data, loading, error };
};
