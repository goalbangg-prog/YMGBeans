import regions from "./regions.json";
import photos from "./originPhotos.json";
// 스토어 분류 기준의 대표 산지 개략 좌표. 사진은 판매 로트의 생산 농장을 특정하지 않습니다.
export const origins = regions.flatMap(region => region.countries.map(country => ({
 ...country,
 region: country.country,
 continent: region.id === "africa" ? "AFRICA" : region.id === "latin" ? "LATIN AMERICA" : "ASIA & OCEANIA",
 flavor: "산지에서 시작하는 생두 이야기",
 ...photos[country.country],
 image: (process.env.PUBLIC_URL === '.' ? '' : process.env.PUBLIC_URL) + '/' + photos[country.country].image.replace(/^\.\//, '')
})));
