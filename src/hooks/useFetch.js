import api from '../services/api';
import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await api.get(url);
      setData(response.data);
    } catch (error) {
      setError(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, options?.refetch]);

  return { data, error };
};

export default useFetch;
