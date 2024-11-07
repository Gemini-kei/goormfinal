"use client";

import { useEffect, useRef, useState } from "react";

export const useLoadScript = (src: string, onLoadCallback?: () => void) => {
  const isScriptLoad = useRef(false);
  const OnLoadCallbackRef = useRef(onLoadCallback);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoadingScript = useRef(false);

  useEffect(() => {
    // if (isScriptLoad.current) {
    //   // 이미 스크립트가 로드되었으면 바로 로드 상태 설정
    //   setIsLoaded(true);
    //   if (OnLoadCallbackRef.current) OnLoadCallbackRef.current();
    //   return;
    // }
    if (isLoadingScript.current){
      return;
    }
    isLoadingScript.current =true

    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    // script.async = true;

    script.onload = () => {
      isScriptLoad.current = true;
      setIsLoaded(true);
      console.log("onload")
      if (OnLoadCallbackRef.current) OnLoadCallbackRef.current();
    };

    script.onerror = () => {
      setError(`Failed to load script: ${src}`);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [src]);

  return { isLoaded, error };
};
