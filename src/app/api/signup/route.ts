import { NextRequest, NextResponse } from "next/server";

// 회원가입 POST 요청 처리
export async function POST(request: NextRequest) {
  const data = await request.json(); // 요청에서 JSON 데이터 추출

  const { email, password, name } = data;

  if (!email || !password || !name) {
    return NextResponse.json(
      { message: "필수 항목이 누락되었습니다." },
      { status: 400 }
    );
  }
  // 회원가입 성공 시
  return NextResponse.json({
    message: "회원가입 성공!",
    userId: "generated-user-id", // 실제로 생성된 사용자 ID를 반환
  });
}
