import { useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import Products from "./Products";
import { origins } from "../db/origins";
import { tasteOptions } from "../db/flavors";
import {
  categories,
  initialFilters,
  regionForCountry,
  processNames,
} from "../db/categories";
import { filterProducts, sortProducts } from "../db/filterProducts";
export default function Catalog({
  products,
  filters,
  onFilters,
  favorites,
  ...actions
}) {
  const [sort, setSort] = useState("default");
  const [limit, setLimit] = useState(12);
  const category =
    categories.find((item) => item.id === filters.category) || categories[0];
  const items = sortProducts(
    filterProducts(products, filters, favorites),
    sort,
  );
  const countries = origins.filter(
    (origin) =>
      category.type !== "region" ||
      regionForCountry[origin.country] === category.id,
  );
  function change(key, value) {
    setLimit(12);
    onFilters((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "category" ? { country: "all" } : {}),
    }));
  }
  function reset() {
    setLimit(12);
    onFilters(initialFilters);
  }
  return (
    <section
      className="catalog section-pad"
      id="shop"
      aria-labelledby="shopTitle"
    >
      <div className="container">
        <div className="section-heading split-heading align-end">
          <div>
            <p className="eyebrow">THE GREEN COFFEE COLLECTION</p>
            <h2 id="shopTitle">
              {filters.favorites
                ? "내가 찜한 생두"
                : category.id === "all"
                  ? "나의 다음 생두"
                  : category.label}
            </h2>
          </div>
          <p>국가로 찾고, 취향으로 한 번 더 좁혀보세요.</p>
        </div>
        <div className="collection-tabs" aria-label="생두 카테고리">
          {categories.map((item) => (
            <button
              key={item.id}
              aria-pressed={filters.category === item.id}
              onClick={() => change("category", item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="catalog-filters">
          <div className="country-filters" aria-label="국가 필터">
            <button
              aria-pressed={filters.country === "all"}
              onClick={() => change("country", "all")}
            >
              모든 국가
            </button>
            {countries.map((origin) => (
              <button
                key={origin.country}
                aria-pressed={filters.country === origin.country}
                onClick={() => change("country", origin.country)}
              >
                {origin.korean}
              </button>
            ))}
          </div>
          <div className="catalog-toolbar">
            <label>
              <span className="sr-only">향미</span>
              <select
                value={filters.profile}
                onChange={(event) => change("profile", event.target.value)}
              >
                <option value="all">모든 취향</option>
                {tasteOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">가공 방식</span>
              <select
                value={filters.process}
                onChange={(event) => change("process", event.target.value)}
              >
                <option value="all">모든 가공 방식</option>
                {[...new Set(products.map((p) => p.process))]
                  .filter((v) => v !== "가공 정보 확인 중")
                  .map((value) => (
                    <option key={value} value={value}>
                      {processNames[value] || value}
                    </option>
                  ))}
              </select>
            </label>
            <label className="catalog-search">
              <Search size={17} />
              <span className="sr-only">생두 검색</span>
              <input
                type="search"
                placeholder="이름 · 국가 · 가공방식"
                value={filters.query}
                onChange={(event) => change("query", event.target.value)}
              />
            </label>
            <label>
              <span className="sr-only">정렬</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="default">기본순</option>
                <option value="low">참고가격 낮은순</option>
                <option value="high">참고가격 높은순</option>
                <option value="name">이름순</option>
              </select>
            </label>
            <button className="reset-filter" onClick={reset}>
              <RotateCcw size={16} />
              초기화
            </button>
          </div>
        </div>
        <div className="catalog-summary">
          <p className="result-count" role="status">
            {filters.query && `“${filters.query}” · `}생두{" "}
            <strong>{items.length}</strong>종
          </p>
          {filters.favorites && (
            <button
              className="text-link"
              onClick={() => change("favorites", false)}
            >
              전체 상품으로 돌아가기
            </button>
          )}
        </div>
        {category.pending ? (
          <div className="empty-state">
            <h3>{category.label} 컬렉션</h3>
            <p>상품 구성을 확인하고 있어요.</p>
            <a
              href="https://smartstore.naver.com/ymgbeans"
              className="btn btn-solid"
              target="_blank"
              rel="noreferrer"
            >
              스마트스토어에서 보기
            </a>
          </div>
        ) : items.length ? (
          <>
            <div
              className="product-grid catalog-results"
              key={`${filters.category}/${filters.country}/${filters.profile}/${filters.process}/${filters.favorites}/${sort}`}
            >
              {items.slice(0, limit).map((product) => (
                <Products
                  key={product.id}
                  product={product}
                  favorites={favorites}
                  {...actions}
                />
              ))}
            </div>
            {items.length > limit && (
              <button
                className="btn btn-outline load-more"
                onClick={() => setLimit((value) => value + 12)}
              >
                생두 더 보기 · {items.length - limit}종
              </button>
            )}
          </>
        ) : (
          <div className="empty-state">
            <h3>
              {filters.favorites
                ? "조건에 맞는 찜한 생두가 없어요"
                : filters.country !== "all" &&
                    !products.some((p) => p.country === filters.country)
                  ? `${origins.find((o) => o.country === filters.country)?.korean} 상품을 준비하고 있어요`
                  : "조건에 맞는 생두가 없어요"}
            </h3>
            <p>
              {filters.country !== "all" &&
              !products.some((p) => p.country === filters.country)
                ? "국가 카테고리는 준비되어 있으며, 확인된 상품을 차례로 등록합니다."
                : "국가나 검색어를 바꿔서 다시 만나보세요."}
            </p>
            <button className="btn btn-solid" onClick={reset}>
              전체 생두 보기
            </button>
          </div>
        )}
        <p className="catalog-data-note">
          상품 사진은 새로 제작한 연출 이미지입니다. 표시 가격은 공개 판매자료의
          참고가격이며, 최신 가격과 재고는 판매처에서 확인해주세요.
        </p>
      </div>
    </section>
  );
}
