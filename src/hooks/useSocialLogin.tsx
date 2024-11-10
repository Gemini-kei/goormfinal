"use client";

import { KaKaoButtonSmall } from '@/components/icons/icons';
//import KakaoMap from '@/components/KakaoMap';
import { useLoadScript } from "./useScriptLoad";

declare global {
  interface Window {
    Kakao: KakaoInstance;
  }
}

interface KakaoInstance {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: {
    login: (options: KakaoLoginOptions) => void;
    logout: (callback?: () => void) => void;
    getAccessToken: () => string | null;
  };
  API: {
    request: <T>(options: KakaoApiRequestOptions<T>) => Promise<T>; // Generics 사용으로 결과 타입 지정 가능
  };
}

interface KakaoLoginOptions {
  success: (authObj: KakaoAuthResponse) => void;
  fail: (error: KakaoError) => void;
}
interface KakaoAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}
interface KakaoError {
  error: string;
  error_description: string;
}

interface KakaoApiRequestOptions<T> {
  url: string;
  data?: Record<string, unknown>;
  success?: (response: T) => void;
  fail?: (error: KakaoError) => void;
}

const appkey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY || ""

export default function KakaoLoginButton() {
  const src = "https://developers.kakao.com/sdk/js/kakao.min.js";
  const { isLoaded, error } = useLoadScript(src, () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(appkey);
    }
  });

  const handleKakaoLogin = () => {
    console.log("test");
    if (window.Kakao) {
      window.Kakao.Auth.login({
        success: (authObj) => {
          console.log("Kakao 로그인 성공:", authObj);
          // authObj에 포함된 access_token을 백엔드 서버로 전송하여 검증 및 처리
        },
        fail: (err) => {
          console.error("Kakao 로그인 실패:", err);
        },
      });
    }
  };

  if (error) return <div>{error}</div>;
  if (!isLoaded) return <div>Loading</div>;

  return (
    <div className="w-full flex justify-center">
      <button onClick={handleKakaoLogin} className="w-full max-w-[300px]">
        <KaKaoButtonSmall />
      </button>
    </div>
  )
  
}
