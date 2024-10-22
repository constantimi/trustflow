import React from 'react';
import { useNavigate } from 'react-router';
import Content from '../../shared/layout/content/Content';
import Layout from '../../shared/layout/layout/Layout';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Content className="flex flex-col items-center">Home</Content>
    </Layout>
  );
};

export default Dashboard;
