import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { categories, initialFilters, regions } from "../db/categories";
import { filterProducts } from "../db/filterProducts";

export default function Header({
  products,
  onCategory,
  onCountry,
  activeCategory,
  cartCount,
  onCart,
  onSearch,
  onShop,
  onFavorites,
  favoriteCount,
}) {
  const [regionOpen, setRegionOpen] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  let location = useLocation();
  useEffect(() => {
      setRegionOpen(null);
      setSearchOpen(false);
      setMenuOpen(false);
  }, [location]);
  const inputRef = useRef(null);
  const searchButtonRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);
  const closeSearch = () => {
    setSearchOpen(false);
    searchButtonRef.current?.focus();
  };
  const submit = (event) => {
    event.preventDefault();
    onSearch(query.trim());
    setSearchOpen(false);
    setMenuOpen(false);
  };
  const suggestions = query.trim()
    ? filterProducts(products, { ...initialFilters, query }).slice(0, 5)
    : [];
  const links = (
    <>
      <button
        onClick={() => {
          onShop();
          setMenuOpen(false);
        }}
      >
        SHOP
      </button>
      <Link to="/#new" onClick={() => setMenuOpen(false)}>
        COLLECTION
      </Link>
      <button
        onClick={() => {
          onCategory("best2025");
          setMenuOpen(false);
        }}
      >
        2025 BEST
      </button>
      <Link to="/#origin" onClick={() => setMenuOpen(false)}>
        ORIGIN
      </Link>
      <Link to="/#finder" onClick={() => setMenuOpen(false)}>
        BEAN FINDER
      </Link>
      <Link to="/about" onClick={() => setMenuOpen(false)}>
        ABOUT
      </Link>
    </>
  );
  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="YMG Beans 홈">
          <img
            src={`${process.env.PUBLIC_URL}/brand/ymg-beans-logo.png`}
            alt="YMG BEANS"
            width="180"
            height="66"
          />
        </Link>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {links}
        </nav>
        <div className="header-actions">
          <button
            ref={searchButtonRef}
            className="icon-btn"
            aria-label="상품 검색"
            aria-expanded={searchOpen}
            aria-controls="headerSearch"
            onClick={() => {
              setRegionOpen(null);
              setSearchOpen(!searchOpen);
              setMenuOpen(false);
            }}
          >
            <Search size={21} strokeWidth={1.6} />
          </button>
          <button
            className="icon-btn"
            aria-label={`찜한 생두 ${favoriteCount}개 보기`}
            onClick={onFavorites}
          >
            <Heart size={21} strokeWidth={1.6} />
          </button>
          <button
            className="icon-btn bag-button"
            aria-label={`장바구니 ${cartCount}개 보기`}
            onClick={onCart}
          >
            <ShoppingBag size={21} strokeWidth={1.6} />
            <span className="cart-count">{cartCount}</span>
          </button>
          <button
            className="menu-btn"
            aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => {
              setRegionOpen(null);
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav className="header-category-bar" aria-label="상품 분류">
        <div className="container">
          {categories
            .filter((c) => c.id !== "all")
            .map((c) => (
              <button
                key={c.id}
                aria-pressed={activeCategory === c.id}
                aria-expanded={
                  c.type === "region" ? regionOpen === c.id : undefined
                }
                aria-controls={c.type === "region" ? "countryMenu" : undefined}
                onClick={() => {
                  if (c.type === "region")
                    setRegionOpen((previous) =>
                      previous === c.id ? null : c.id,
                    );
                  else {
                    setRegionOpen(null);
                    onCategory(c.id);
                  }
                  setSearchOpen(false);
                  setMenuOpen(false);
                }}
              >
                {c.label}
              </button>
            ))}
        </div>
      </nav>
      {regionOpen && (
        <div
          className="header-country-panel"
          id="countryMenu"
          onKeyDown={(e) => {
            if (e.key === "Escape") setRegionOpen(null);
          }}
        >
          <div className="container">
            <div className="country-panel-heading">
              <strong>{regions.find((r) => r.id === regionOpen)?.label}</strong>
              <button
                className="icon-btn"
                aria-label="국가 메뉴 닫기"
                onClick={() => setRegionOpen(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="country-panel-links">
              <button
                onClick={() => {
                  onCategory(regionOpen);
                  setRegionOpen(null);
                }}
              >
                전체 보기
              </button>
              {regions
                .find((r) => r.id === regionOpen)
                ?.countries.map((country) => (
                  <button
                    key={country.country}
                    onClick={() => {
                      onCountry(country.country);
                      setRegionOpen(null);
                    }}
                  >
                    {country.korean}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
      <nav
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        id="mobileNav"
        aria-label="모바일 메뉴"
        hidden={!menuOpen}
      >
        {links}
      </nav>
      <div
        id="headerSearch"
        className="header-search"
        hidden={!searchOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape") closeSearch();
        }}
      >
        <form className="container" onSubmit={submit} role="search">
          <label htmlFor="productSearch">어떤 생두를 찾으세요?</label>
          <div className="header-search-row">
            <Search size={22} />
            <input
              ref={inputRef}
              id="productSearch"
              type="search"
              placeholder="국가, 생두 이름, 향미로 검색"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button className="btn btn-solid" type="submit">
              검색
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={closeSearch}
              aria-label="검색창 닫기"
            >
              <X />
            </button>
          </div>
          {query.trim() && (
            <div className="search-suggestions" aria-label="검색 결과 미리보기">
              {suggestions.length ? (
                suggestions.map((product) => (
                  <button
                    type="button"
                    key={product.id}
                    onClick={() => {
                      onSearch(product.name);
                      setSearchOpen(false);
                    }}
                  >
                    <span>{product.name}</span>
                    <small>{product.country}</small>
                  </button>
                ))
              ) : (
                <p>
                  일치하는 상품이 없어요. 다른 국가나 상품명을 입력해보세요.
                </p>
              )}
            </div>
          )}
          <p>
            추천 검색어{" "}
            <button
              type="button"
              onClick={() => {
                setQuery("에티오피아");
                onSearch("에티오피아");
                setSearchOpen(false);
              }}
            >
              에티오피아
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("초콜릿");
                onSearch("초콜릿");
                setSearchOpen(false);
              }}
            >
              초콜릿
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("워시드");
                onSearch("워시드");
                setSearchOpen(false);
              }}
            >
              워시드
            </button>
          </p>
        </form>
      </div>
    </header>
  );
}
