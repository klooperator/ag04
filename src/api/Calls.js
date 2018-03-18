import token from './prefetch';
import { tasks } from './postfetch';

const route = '/api/';

export default {
  sign_up: {
    url: `${route}signup`,
    options: {
      method: 'post',
    },
  },
  sign_in: {
    url: `${route}signin`,
    options: {
      method: 'post',
    },
  },
  me: {
    url: `${route}me`,
    prefetch: [token],
  },
  users: {
    url: `${route}users`,
    prefetch: [token],
  },
  tasks: {
    url: `${route}tasks`,
    prefetch: [token],
    postfetch: [tasks],
  },
  task: {
    url: `${route}task`,
    options: {
      method: 'post',
    },
    prefetch: [token],
  },
  update_task: {
    url: `${route}task/:task_id`,
    options: {
      method: 'put',
    },
    prefetch: [token],
  },
  tags: {
    url: `${route}tags`,
    prefetch: [token],
  },
};
