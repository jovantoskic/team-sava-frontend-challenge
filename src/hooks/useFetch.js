import { useState, useEffect } from 'react';
import api from '../services/api';
import { getToken } from '../services/storage';

const useFetch = (url, options) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const token = getToken();

  const fetchData = async () => {
    try {
      const response = await api.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
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
