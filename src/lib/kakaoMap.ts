declare global {
  interface Window {
    kakao: any;
  }
}

let kakaoMapPromise: Promise<typeof window.kakao> | null = null;

export function loadKakaoMap(): Promise<typeof window.kakao> {
  if (typeof window === "undefined") {
    return Promise.reject("window is undefined");
  }

  if (window.kakao && window.kakao.maps) {
    return Promise.resolve(window.kakao);
  }

  if (kakaoMapPromise) return kakaoMapPromise;

  kakaoMapPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");

    const key = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
    if (!key) {
      reject(new Error("Kakao JS Key is undefined"));
      return;
    }

    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      if (!window.kakao) {
        reject(new Error("Kakao SDK not loaded"));
        return;
      }

      window.kakao.maps.load(() => {
        resolve(window.kakao);
      });
    };

    script.onerror = () => {
      reject(new Error("Failed to load Kakao SDK script"));
    };

    document.head.appendChild(script);
  });

  return kakaoMapPromise;
}
