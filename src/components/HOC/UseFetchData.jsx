import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchData(url, deleteStatus = false) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  console.log("FETCH", token);
  useEffect(() => {
    if (!url) return; // Stop execution if URL is null

    setLoading(true);
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
        setError(error);
        setLoading(false);
      });
  }, [url, deleteStatus]);

  return { data, loading, error };
}
