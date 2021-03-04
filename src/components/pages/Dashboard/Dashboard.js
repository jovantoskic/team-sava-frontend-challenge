import React from 'react';
import useFetch from '../../../hooks/useFetch';

function Dashboard() {
  // let config = {
  //   headers: { 'Access-Control-Allow-Origin': true },
  // };

  const { data, error } = useFetch('/config');
  console.log(data, error)

  return <div>dashboard</div>;
}

export default Dashboard;
