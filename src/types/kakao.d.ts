declare global {
  interface Window {
    kakao: typeof kakao;
  }
}

declare namespace kakao {
  namespace maps {
    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setCenter(latlng: LatLng): void;
      panTo(latlng: LatLng): void;
      getCenter(): LatLng;
      relayout(): void;
    }

    interface MapOptions {
      center: LatLng;
      level?: number;
      draggable?: boolean;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      setZIndex(zIndex: number): void;
      setImage(image: MarkerImage | null): void;
    }

    interface MarkerOptions {
      map?: Map;
      position: LatLng;
      zIndex?: number;
      image?: MarkerImage;
    }

    class MarkerImage {
      constructor(src: string, size: Size, options?: MarkerImageOptions);
    }

    interface MarkerImageOptions {
      offset?: Point;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Size {
      constructor(width: number, height: number);
    }

    class Point {
      constructor(x: number, y: number);
    }

    namespace event {
      function addListener(
        target: unknown,
        type: string,
        handler: () => void
      ): void;
    }

    namespace services {
      type Status = "OK" | "ZERO_RESULT" | "ERROR";

      interface PlacesSearchResultItem {
        id: string;
        place_name: string;
        x: string;
        y: string;
        address_name: string;
        road_address_name: string;
        category_name: string;
        category_group_code: string;
        phone?: string;
      }

      type PlacesSearchResult = PlacesSearchResultItem[];

      class Places {
        keywordSearch(
          keyword: string,
          callback: (data: PlacesSearchResult, status: Status) => void
        ): void;
      }
    }
  }
}
