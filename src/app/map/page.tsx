"use client";

import KakaoMap from '@/components/Map';



export default function Map() {
  
  const latitude = 37.5665
  const longitude = 126.978
  return(
    <div>
      <KakaoMap latitude= {latitude} longitude={longitude}/>
    </div>
  )

}