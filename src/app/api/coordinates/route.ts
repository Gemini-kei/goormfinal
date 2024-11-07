// app/api/coordinates/route.ts
import { NextResponse } from "next/server";

// 샘플 좌표 데이터
const coordinates = [
  { id: 1, latitude: 33.450701, longitude: 126.570667 },
  { id: 2, latitude: 33.451701, longitude: 126.571667 },
  { id: 3, latitude: 33.452701, longitude: 126.572667 },
];

export async function GET() {
  return NextResponse.json(coordinates);
}
