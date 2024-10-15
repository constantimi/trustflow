import config from '../config/config';
import { SessionStore } from '../utils/session';

const endpoints = () => {
  const workspace = SessionStore.getActiveWorkspace();
  const baseUrl = `${config.API_URL}/api/app`;

  return {
    base: baseUrl,

    token: `${baseUrl}/users/token/54bb2165-71e1-41a6-af3e-7da4a0e1e2c1`,
    refresh_token: `${baseUrl}/users/token/refresh/54bb2165-71e1-41a6-af3e-7da4a0e1e2c1`,

    register: `${baseUrl}/users/register`,
    insurances: `${baseUrl}/insurances`,
    workspaceInsurances: `${baseUrl}/${workspace}/insurances`,

    users: `${baseUrl}/users`,
    workspaceUsers: `${baseUrl}/${workspace}/users`,
  };
};

const AuthAPI = {
  endpoints,
};

export default AuthAPI;
