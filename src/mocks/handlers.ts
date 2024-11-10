// src/mocks/handlers.ts
import {rest} from "msw";

//const api_url = 'http://52.79.152.88:8080/api/'

export const handlers = [
  // 회원가입 API 요청 목킹
  rest.post('https://52.79.152.88:8080/api/signup', async (req, res, ctx) => {
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
        accessToken: 'mock-token-123456', // 모킹된 토큰
        refreshToken: 'mock-token-678909',
        userId: '12345',
      })
    );
  }),

  rest.post('https://52.79.152.88:8080/api/check-email', async(req, res, ctx) => {
    
    const {email} = await req.json();
    console.log(email)
    if (email === 'test@example.com'){
      return res(
        ctx.status(400),
        ctx.json({message: '이미 사용 중인 이메일 입니다.'})
      )
    }
    return res(
      ctx.status(200),
      ctx.json({
        message: "사용 가능한 이메일 입니다."
      })
    )
  }),

  // 로그인 API 모킹
  rest.post('https://52.79.152.88:8080/api/login', async (req, res, ctx) => {
    const { email, password } = await req.json();

    // 로그인 유효성 검사
    if (email === 'test@test.com' && password === '1234') {
      return res(
        ctx.status(200),
        ctx.json({
          message: '로그인 성공!',
          accessToken: 'mock-token-12345', // 모킹된 토큰
          refreshToken: 'mock-token-67890',
          userId: 123,
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
  rest.post('https://52.79.152.88:8080/api/members', async (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization'); // Authorization 헤더에서 토큰 추출

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(
        ctx.status(401),
        ctx.json({
          message: 'Authorization header is missing or invalid.',
        })
      );
    }

    const accessToken = authHeader.split(' ')[1]; // 'Bearer token' 형식에서 토큰만 추출

    // 로그인 유효성 검사
    if (accessToken === 'mock-token-12345') {  // 모킹된 토큰과 비교
      return res(
        ctx.status(200),
        ctx.json({
          message: '로그인 성공!',
          accessToken: 'mock-token-12345',
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
        ctx.status(403),
        ctx.json({
          message: 'Invalid or expired token.',
        })
      );
    }
  }),

  //로그아웃 API 모킹
  rest.post('https://52.79.152.88:8080/api/logout', (req, res, ctx) => {
    // 로그아웃은 보통 별도의 요청 데이터를 확인할 필요가 없음
    return res(
      ctx.status(200),
      ctx.json({
        message: '로그아웃 성공!',
      })
    );
  }),

  rest.get('https://52.79.152.88:8080/api/markers', (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId'); // 쿼리 파라미터에서 userId 추출
    console.log(userId, "msw 핸들러")
    if (!userId) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'User ID is required' })
      );
    }

    // 더미 마커 데이터
    const markersData = {
      userId,
      locations: [
        {
          groupId: 1,
          name: 'Group A',
          latitude: 37.5665,
          longitude: 126.9780,
        },
        {
          groupId: 2,
          name: 'Group B',
          latitude: 37.5695,
          longitude: 126.9717,
        },
        {
          groupId: 3,
          name: 'Group B',
          latitude: 37.3895,
          longitude: 126.1917,
        },
      ],
    };

    return res(
      ctx.status(200),
      ctx.json(markersData) // 마커 데이터 반환
    );
  }),

];
