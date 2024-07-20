import { faker } from '@faker-js/faker';
import { delay, http, HttpResponse } from 'msw';

import { UserApi } from '@/api/services/userService';

import { USER_LIST } from '../assets';

const signIn = http.post(`/api${UserApi.SignIn}`, async ({ request }) => {
  const { email, password } = await request.json();

  const user = USER_LIST.find((item) => item.email === email);

  if (!user || user.password !== password) {
    return HttpResponse.json({
      status: 10001,
      message: '이메일이나 비밀번호가 맞지 않습니다.',
    });
  }

  return HttpResponse.json({
    status: 0,
    message: '',
    data: {
      user,
      accessToken: faker.string.uuid(),
      refreshToken: faker.string.uuid(),
    },
  });
});

const userList = http.get('/api/user', async () => {
  await delay(1000);
  return HttpResponse.json(
    Array.from({ length: 10 }).map(() => ({
      fullname: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      address: faker.location.streetAddress(),
    })),
    {
      status: 200,
    },
  );
});

export default [signIn, userList];
