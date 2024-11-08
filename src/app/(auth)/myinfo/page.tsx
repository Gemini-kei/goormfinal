"use client";

import { useFetchUserInfo } from '@/hooks/useUserInfo';
import { useState, useEffect } from 'react';

export default function MyInfo() {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("accessToken");
      if (token) setAccessToken(token);
    }
  }, []); // 클라이언트에서만 실행

  const { data, isLoading, isError, error } = useFetchUserInfo(accessToken);

  if (!accessToken) {
    return (
      <div>
        <p>Please login to view your info.</p>
        <a href="/login">Go to Login</a>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading user info...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || 'Failed to load user info.'}</div>;
  }

  return <div>User Info: {JSON.stringify(data, null, 2)}</div>;
}

