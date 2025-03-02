import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const fetchData = useCallback(async () => {
    if (!url) return;

    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        console.warn("Access token expired. Attempting refresh...");

        if (!refreshToken) {
          console.error("No refresh token available.");
          setError(new Error("Authentication required"));
          return;
        }

        try {
          const refreshResponse = await axios.post(
            "http://localhost:8383/auth/refresh-token",
            { refreshToken }
          );

          const newAccessToken = refreshResponse.data.accessToken;
          const newRefreshToken = refreshResponse.data.refreshToken;

          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          console.log("Token refreshed successfully.");

          // Retry fetching data with the new token
          const retryResponse = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              "Content-Type": "application/json",
            },
          });

          setData(retryResponse.data);
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          setError(refreshError);
        }
      } else {
        console.error("Error fetching data:", err.response?.data || err.message);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}
