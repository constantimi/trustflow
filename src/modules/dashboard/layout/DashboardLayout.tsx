import React from 'react';
import { Content, Header } from '../../shared/layout';
import Layout from '../../shared/layout/layout/Layout';
import ThemeToggle from '../../shared/components/toggle/ThemeToggle';
import AppLogo from '../../shared/components/logo/AppLogo';

interface Props {
  children?: React.ReactNode[] | React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => (
  <Layout>
    <Header>
      <div className="flex h-full flex-row items-center justify-between px-6">
        <AppLogo />
        <ThemeToggle />
      </div>
    </Header>
    <Content>{children}</Content>
  </Layout>
);

export default DashboardLayout;
