"use client";

import CTAbutton from "./CTAbutton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="flex flex-wrap justify-center items-center max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full lg:w-1/2">
          <Image
            src="/BannerImage.png"
            alt="banner-image"
            width={600}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        <div className="w-full lg:w-1/2 p-6 space-y-5 text-center lg:text-left">
          <h2 className="text-2xl font-extrabold text-gray-800">
            함께한 여행 지도 위에 남기는 추억
          </h2>
          <p className="text-lg text-gray-600">
            여행 중 찍은 사진, 어디서 찍었는지 기억 안 나세요? 위치 기반
            갤러리로 자동 정리하고 함께한 친구들과 추억을 쉽게 공유해보세요!
          </p>
          <div className="flex justify-center lg:justify-start">
            <CTAbutton CTAmsg="지금 바로, 추억을 지도 위에 남기고 공유하세요!"
            
            />
          </div>
        </div>
      </div>
    </div>
  );
}
