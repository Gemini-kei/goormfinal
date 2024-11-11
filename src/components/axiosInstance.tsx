import axios from 'axios';

// axios 인스턴트

const base_api_url = "/api/proxy"
export const axiosInstance = axios.create({
  baseURL: base_api_url, // api 기본 도메인 
  headers:{
    'Content-Type': 'application/json',
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // accessToken 가져오기
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`; // 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401 Unauthorized 처리 (예: 토큰 만료)
      console.error('Unauthorized, redirecting to login...');
      localStorage.removeItem('accessToken'); // 만료된 토큰 제거
      window.location.href = '/login'; // 로그인 페이지로 이동
    }
    return Promise.reject(error);
  }
);
