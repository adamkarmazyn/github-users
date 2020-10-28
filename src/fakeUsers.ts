import { User } from './models';

export const fakeUsers: User[] = [
  {
    id: 1,
    login: 'aLogin',
    avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
    name: 'aName',
  },
  {
    id: 2,
    login: 'bLogin',
    avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',
    name: 'bName',
  },
  {
    login: 'cLogin',
    id: 3,
    avatar_url: 'https://avatars0.githubusercontent.com/u/3?v=4',
    name: 'cName',
  },
];

const [firstFakeUser, , lastFakeUser] = fakeUsers;
export { firstFakeUser, lastFakeUser };
