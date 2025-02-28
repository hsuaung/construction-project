// import { useState, useEffect } from "react";
// import axios from "axios";

// export function useFetchData(url, deleteStatus=false) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(url)
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error.message);
//         setError(error);
//         setLoading(false);
//       });
//   }, [url, deleteStatus]); // Re-fetch data when deleteStatus changes

//   return { data, loading, error };
// }

import { useState, useEffect, useCallback } from "react"
import axios from "axios"

export function useFetchData(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const token = localStorage.getItem("token")

  const fetchData = useCallback(() => {
    if (!url) return

    setLoading(true)
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching data:", error.response?.data || error.message)
        setError(error)
        setLoading(false)
      })
  }, [url, token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return { data, loading, error, refetch }
}
