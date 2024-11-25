"use client";


import Link from 'next/link';
import { useSearchParams } from "next/navigation";


export default function Invitation() {
  const searchParams = useSearchParams();
  const groupToken = searchParams.get("groupToken") || ""; // null 처리
  const encodedGroupName = searchParams.get("groupName") || ""; // null 처리

  const groupName = encodedGroupName ? decodeURIComponent(encodedGroupName) : "";
  if (groupToken) {localStorage.setItem('groupToken',groupToken)}

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">그룹 초대</h1>
      <p className="mt-4">
        {groupName ? (
          <>그룹 <strong>{groupName}</strong>에 초대되었습니다.</>
        ) : (
          "그룹 이름을 불러올 수 없습니다."
        )}
      </p>
      
      <Link href="/login" className="text-gray-700 font-semibold hover:text-blue-600 focus:text-blue-600">
        초대수락
      </Link>
      
    </div>
  );
}
