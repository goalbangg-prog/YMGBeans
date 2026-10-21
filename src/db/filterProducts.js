import { origins } from "./origins";
import { tasteOptions } from "./flavors";
import { processNames, categories } from "./categories";
const guideWords = {
  chocolate: "초콜릿 초콜렛 고소 달콤 chocolate nutty",
  floral: "꽃향 자스민 floral",
  fruity: "과일 베리 fruity berry",
  citrus: "산미 상큼 산뜻 citrus",
  bold: "묵직 바디 진한 body",
};
export const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[\s·.\-/]+/g, "");
export function filterProducts(products, filters, favorites = []) {
  const terms = String(filters.query || "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  return products.filter((product) => {
    const origin = origins.find((item) => item.country === product.country);
    const searchable = normalize(
      [
        product.country,
        origin?.korean,
        product.name,
        product.englishName,
        product.koreanName,
        product.process,
        processNames[product.process],
        ...(product.flavors || []),
        ...product.profile.map(
          (id) =>
            (tasteOptions.find((p) => p.id === id)?.title || "") +
            " " +
            guideWords[id],
        ),
        ...product.categories.map(
          (id) => categories.find((c) => c.id === id)?.label,
        ),
      ].join(" "),
    );
    return (
      (!filters.category ||
        filters.category === "all" ||
        product.categories.includes(filters.category)) &&
      (filters.country === "all" || product.country === filters.country) &&
      (filters.profile === "all" ||
        product.profile.includes(filters.profile)) &&
      (!filters.process ||
        filters.process === "all" ||
        product.process === filters.process) &&
      (!filters.favorites || favorites.includes(product.id)) &&
      terms.every((term) => searchable.includes(normalize(term)))
    );
  });
}
export function sortProducts(items, sort) {
  return [...items].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name, "ko");
    if (!["low", "high"].includes(sort)) return 0;
    if (a.price === null) return b.price === null ? 0 : 1;
    if (b.price === null) return -1;
    return sort === "low" ? a.price - b.price : b.price - a.price;
  });
}
