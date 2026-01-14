export const searchPlaces = (
  keyword: string
  // ): Promise<kakao.maps.services.PlacesSearchResult> => {
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(
      keyword,
      (
        data: kakao.maps.services.PlacesSearchResult,
        status: kakao.maps.services.Status
      ) => {
        if (status === "OK") {
          resolve(data);
        } else {
          reject(status);
        }
      }
    );
  });
};
