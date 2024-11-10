import axios from 'axios';

// axios 인스턴트
export const axiosInstance = axios.create({
  baseURL: '/api', // api 기본 도메인 
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
    console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);