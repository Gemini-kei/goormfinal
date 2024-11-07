"use client";

import CTAbutton from "./CTAbutton";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex justify-center items-center max-h-[800px] bg-white">
        <div className="flex justify-center items-center w-1/2  bg-blue-300">
          <Image
            src="/BannerImage.png"
            alt="banner-image"
            width={300}
            height={300}
            className="w-auto h-auto"
            priority
          />
        </div>
        <div className="w-1/2 flex-col p-4 mt-4 space-y-5 text-black">
          <h2 className="text-xl font-bold">
            {" "}
            함께한 여행 지도 위에 남기는 추억{" "}
          </h2>
          <p className="font-semibold">
            여행 중 찍은 사진, 어디서 찍었는지 기억 안 나세요? 위치 기반
            갤러리로 자동 정리하고 함께한 친구들과 추억을 쉽게 공유해보세요!
          </p>
          <CTAbutton CTAmsg="지금 바로, 추억을 지도 위에 남기고 공유하세요!" />
        </div>
      </div>
    </div>
  );
}
