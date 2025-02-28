// import { useState, useEffect } from "react";
// import axios from "axios";

// export function useFetchData(url, deleteStatus = false) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem("token");
//   console.log("FETCH", token);
//   useEffect(() => {
//     if (!url) return; // Stop execution if URL is null

//     setLoading(true);
//     axios
//       .get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(
//           "Error fetching data:",
//           error.response?.data || error.message
//         );
//         setError(error);
//         setLoading(false);
//       });
//   }, [url, deleteStatus]);

//   return { data, loading, error };
// }
import { useState, useEffect } from "react";
import axios from "axios";

export function useFetchData(url, deleteStatus = false) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("FETCH", token);

  useEffect(() => {
    if (!url) return; 

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
     
          try {
            if (!refreshToken) {
              throw new Error("No refresh token available.");
            }

            const refreshResponse = await axios.post(
              "http://localhost:8383/auth/refresh-token",
              { refreshToken }
            );

           
            localStorage.setItem(
              "accessToken",
              refreshResponse.data.accessToken
            );
            localStorage.setItem(
              "refreshToken",
              refreshResponse.data.refreshToken
            );

           
            const retryResponse = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${refreshResponse.data.accessToken}`,
              },
            });

            setData(retryResponse.data);
            setLoading(false);
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            setError(refreshError);
            setLoading(false);
          }
        } else {
          console.error(
            "Error fetching data:",
            err.response?.data || err.message
          );
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [url, deleteStatus, token, refreshToken]);

  return { data, loading, error };
}
