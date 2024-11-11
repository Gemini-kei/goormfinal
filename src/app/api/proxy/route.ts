import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return handleProxyRequest(req);
}

export async function POST(req: NextRequest) {
  return handleProxyRequest(req);
}

// 필요한 경우 다른 HTTP 메서드 추가
export async function PUT(req: NextRequest) {
  return handleProxyRequest(req);
}

export async function PATCH(req: NextRequest) {
  return handleProxyRequest(req);
}

export async function DELETE(req: NextRequest) {
  return handleProxyRequest(req);
}

async function handleProxyRequest(req: NextRequest) {
  const { pathname, searchParams } = new URL(req.url);
  const path = pathname.replace('/api/proxy', ''); // `/api/proxy` 제거
  
  const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}${path}?${searchParams}`;

  try {
    const response = await fetch(backendUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? await req.text() : undefined, // POST/PUT/DELETE일 경우 Body 포함
    });

    const responseBody = await response.text(); // JSON 응답을 텍스트로 받아서 반환
    return new NextResponse(responseBody, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('Proxy request error:', error);
    return new NextResponse('Error in proxy request', { status: 500 });
  }
}
