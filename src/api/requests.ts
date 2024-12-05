import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

// use like
// const { data, loading, error } = useAxiosFetch<any>("https://api.example.com/data");

export const useAxiosFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axios.get(url);
      setData(response.data);
      setError(null); // Clear previous errors on successful fetch
    } catch (err: any) {
      setError(err?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
};

// use like
// const { response, loading, error, postData } = useAxiosPost<any>("https://api.example.com/submit", { name });

export const useAxiosPost = <T>(url: string, body: any) => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postData = async () => {
    setLoading(true);
    try {
      const result: AxiosResponse<T> = await axios.post(url, body);
      setResponse(result.data);
      setError(null); // Clear previous errors on successful post
    } catch (err: any) {
      setError(err?.message || "Failed to post data");
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, postData };
};
