import Script from "next/script";

const appkey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY; // Kakao API 키를 입력하세요

const src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appkey}&autoload=false`;

export default function Layout({ children }: React.PropsWithChildren) {
  // console.log("layout등장")
  return (
    <>
      <Script 
        src={src} 
        strategy="beforeInteractive"
        type="text/javascript"
      />

      {children}
    </>
  );
}
