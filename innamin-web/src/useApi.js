import { useEffect, useState } from "react";
import { API_URL } from "./api";

export function useApi(path) {
  const [result, setResult] = useState({ path: null, data: null, error: "" });

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}${path}`)
      .then((response) => {
        if (response.status === 404) throw new Error("not-found");
        if (!response.ok) throw new Error(`Server replied ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setResult({ path, data, error: "" });
      })
      .catch((err) => {
        if (!cancelled) setResult({ path, data: null, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  const loading = result.path !== path;

  return {
    data: loading ? null : result.data,
    error: loading ? "" : result.error,
    loading,
  };
}