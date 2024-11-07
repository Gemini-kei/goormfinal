// src/mocks/handlers.ts
import {rest} from "msw";


export const handlers = [
  // 회원가입 API 요청 목킹
  rest.post('https://api.test.com/signup', async (req, res, ctx) => {
    const { email } = await req.json();
    
    if (email === 'test@example.com') {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Email already exists' })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Signup successful!',
        userId: '12345',
      })
    );
  }),

  // 로그인 API 모킹
  rest.post('https://api.test.com/login', async (req, res, ctx) => {
    const { email, password } = await req.json();

    // 로그인 유효성 검사
    if (email === 'test@test.com' && password === '123') {
      return res(
        ctx.status(200),
        ctx.json({
          message: '로그인 성공!',
          accessToken: 'mock-token-12345', // 모킹된 토큰
          refreshToken: 'mock-token-67890',
          user: {
            id: '123',
            name: 'John Doe',
            email: 'user@example.com',
          },
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          message: '이메일 또는 비밀번호가 올바르지 않습니다.',
        })
      );
    }
  }),

  //로그아웃 API 모킹
  rest.post('https://api.test.com/logout', (req, res, ctx) => {
    // 로그아웃은 보통 별도의 요청 데이터를 확인할 필요가 없음
    return res(
      ctx.status(200),
      ctx.json({
        message: '로그아웃 성공!',
      })
    );
  }),
];
