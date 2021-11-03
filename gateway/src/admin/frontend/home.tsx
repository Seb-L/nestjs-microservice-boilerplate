import { Box } from '@adminjs/design-system';
import { ApiClient } from 'adminjs';
import React, { useState, useEffect } from 'react';

const api = new ApiClient();

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    api.getDashboard().then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  return (
    <Box variant="grey">
      <Box variant="white">some dashboard</Box>
    </Box>
  );
};

export default Dashboard;
