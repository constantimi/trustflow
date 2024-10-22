import React from 'react';
import { Content, Header } from '../../shared/layout';
import Layout from '../../shared/layout/layout/Layout';
import ThemeToggle from '../../shared/components/toggle/ThemeToggle';

interface Props {
  children?: React.ReactNode[] | React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => (
  <Layout>
    <Header>
      <div className="flex h-full flex-row items-center justify-end px-6">
        <ThemeToggle />
      </div>
    </Header>
    <Content>{children}</Content>
  </Layout>
);

export default DashboardLayout;
