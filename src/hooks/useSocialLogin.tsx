"use client";

import { useLoadScript } from "./useScriptLoad";

declare global {
  interface Window {
    Kakao: any;
  }
}

const appkey = "069481cff51bf8cac4e0701eeee69422"; // Kakao API 키를 입력하세요

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
        success: (authObj: any) => {
          console.log("Kakao 로그인 성공:", authObj);
          // authObj에 포함된 access_token을 백엔드 서버로 전송하여 검증 및 처리
        },
        fail: (err: any) => {
          console.error("Kakao 로그인 실패:", err);
        },
      });
    }
  };

  if (error) return <div>{error}</div>;
  if (!isLoaded) return <div>Loading</div>;

  return <button onClick={handleKakaoLogin}>카카오 로그인</button>;
}
