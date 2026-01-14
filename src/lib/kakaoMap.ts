export function loadKakaoMap(): Promise<typeof window.kakao> {
  return new Promise((resolve, reject) => {
    if (!window.kakao) {
      reject(new Error("Kakao SDK not loaded"));
      return;
    }

    // autoload=false 이므로 반드시 필요
    (window.kakao.maps as any).load(() => {
      resolve(window.kakao);
    });
  });
}
