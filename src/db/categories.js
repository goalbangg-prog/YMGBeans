import regions from "./regions.json";
export const categories = [
  { id: "all", label: "전체 생두", type: "all" },
  { id: "africa", label: "아프리카", type: "region" },
  { id: "latin", label: "중남미", type: "region" },
  { id: "asia-oceania", label: "아시아 및 대양주", type: "region" },
  { id: "decaf", label: "디카페인", type: "collection" },
  { id: "best2025", label: "2025 Best", type: "collection", pending: true },
  { id: "premium", label: "명품생두", type: "collection", pending: true },
  { id: "anaerobic", label: "무산소 발효", type: "collection" },
];
export const initialFilters = {
  category: "all",
  country: "all",
  profile: "all",
  process: "all",
  query: "",
  favorites: false,
};
export { regions };
export const regionForCountry = Object.fromEntries(
  regions.flatMap((region) =>
    region.countries.map((country) => [country.country, region.id]),
  ),
);
export const processNames = {
  Washed: "워시드",
  Natural: "내추럴",
  "Honey Natural": "허니 내추럴",
  "Sugarcane Decaf": "슈가케인 디카페인",
  "Mountain Water Decaf": "마운틴워터 디카페인",
  "Anaerobic Honey": "무산소 발효 · 허니",
};
