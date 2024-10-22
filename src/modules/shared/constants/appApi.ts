import config from '../config/config';
import { SessionStore } from '../utils/session';

const endpoints = () => {
  const workspace = SessionStore.getActiveWorkspace();
  const baseUrl = `${config.API_URL}/api/app`;

  return {
    base: baseUrl,

    users: `${baseUrl}/users`,
    userPolicy: `${baseUrl}/users/policy`,

    policy: `${baseUrl}/policy`,
    workspaceUsers: `${baseUrl}/${workspace}/users`,
  };
};

const AppAPI = {
  endpoints,
};

export default AppAPI;
