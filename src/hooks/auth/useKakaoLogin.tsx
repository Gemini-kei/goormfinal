"use client";

import { KaKaoButtonSmall } from '@/components/icons/icons';

export default function KakaoLoginBtn() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=daeded2f3bec1947cd7e5ccce6bb1c78&redirect_uri=http://52.79.152.88:8080/api/members/login/kakao&response_type=code&prompt=login`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL; // 카카오 로그인 페이지로 리디렉션
  };

  return (
    <div className="w-full flex justify-center">
      <button onClick={handleLogin} className="w-full max-w-[300px]">
        <KaKaoButtonSmall />
      </button>
    </div>
  )
}

