import { useState } from "react";
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  ExternalLink,
  Minus,
  Plus,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { won } from "./Products";
import Products from "./Products";
import Reveal from "./Reveal";
import { processNames, categories, regionForCountry } from "../db/categories";
import { origins } from "../db/origins";

export default function Detail(props) {
  let { paramId } = useParams();
  let products = props.beans;
  // 교안의 props.fruit.find와 같은 방식. 생두 ID는 문자열이므로 Number 변환하지 않습니다.
  let product = props.beans.find((x) => x.id === paramId);
  let { onShop, onCountry, onCategory, onAdd, onDetail, favorites = [], onFavorite } = props;
  let [tap, setTap] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [photo, setPhoto] = useState("product");
  if (!product)
    return (
      <main className="product-page" id="product-main" tabIndex="-1">
        <div className="container product-missing">
          <p className="eyebrow">YMG BEANS COLLECTION</p>
          <h1>상품을 찾을 수 없어요</h1>
          <p>상품 목록에서 다른 생두를 만나보세요.</p>
          <button className="btn btn-solid" onClick={onShop}>
            전체 생두 보기
          </button>
        </div>
      </main>
    );
  const origin = origins.find((o) => o.country === product.country);
  const region = categories.find(
    (c) => c.id === regionForCountry[product.country],
  );
  const process = processNames[product.process] || product.process;
  const related = products
    .filter((p) => p.id !== product.id)
    .sort(
      (a, b) =>
        Number(b.country === product.country) -
        Number(a.country === product.country),
    )
    .slice(0, 4);
  const isFavorite = favorites.includes(product.id);
  const total = product.price === null ? null : product.price * quantity;
  const scrollTo = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  return (
    <main className="product-page" id="product-main" tabIndex="-1">
      <div className="container">
        <nav className="product-breadcrumb" aria-label="현재 위치">
          <Link to="/">HOME</Link>
          <ChevronRight size={13} />
          <button onClick={() => onCategory(region.id)}>{region.label}</button>
          <ChevronRight size={13} />
          <button onClick={() => onCountry(product.country)}>
            {origin.korean}
          </button>
          <ChevronRight size={13} />
          <span>{product.name}</span>
        </nav>
        <section className="product-intro" aria-labelledby="product-title">
          <div className="product-gallery">
            <div className="product-gallery-frame">
              <img
                key={photo}
                src={photo === "product" ? product.image : origin.image}
                alt={photo === "product" ? "생두 연출 이미지" : origin.photoAlt}
                width="1254"
                height="1254"
              />
              <span className="gallery-label">
                {photo === "product" ? "GREEN COFFEE" : "AT ORIGIN"}
              </span>
            </div>
            <div className="product-gallery-bottom">
              <div className="gallery-thumbs">
                <button
                  aria-label="생두 이미지"
                  aria-pressed={photo === "product"}
                  onClick={() => setPhoto("product")}
                >
                  <img src={product.image} alt="" />
                </button>
                <button
                  aria-label="산지 사진"
                  aria-pressed={photo === "origin"}
                  onClick={() => setPhoto("origin")}
                >
                  <img src={origin.image} alt="" />
                </button>
              </div>
              <p>
                {photo === "product"
                  ? "상품 이해를 돕기 위한 연출 이미지"
                  : origin.caption}
              </p>
            </div>
          </div>
          <div className="product-purchase">
            <p className="eyebrow">{product.country} / GREEN COFFEE</p>
            <h1 id="product-title">{product.name}</h1>
            <p className="product-english">{product.englishName}</p>
            <div className="product-tags">
              {product.categories.map((id) => (
                <button key={id} onClick={() => onCategory(id)}>
                  {categories.find((c) => c.id === id)?.label}
                </button>
              ))}
            </div>
            <div className="product-price">
              <span>참고가격</span>
              <strong>{won(product.price)}</strong>
              <small>
                {product.unitKg
                  ? `${product.unitKg}kg 기준`
                  : "판매 단위 확인 필요"}
              </small>
            </div>
            <dl className="product-specs">
              <div>
                <dt>원산지</dt>
                <dd>{origin.korean}</dd>
              </div>
              <div>
                <dt>가공 방식</dt>
                <dd>{process}</dd>
              </div>
              <div>
                <dt>판매 단위</dt>
                <dd>
                  {product.unitKg ? `${product.unitKg}kg` : "판매처 확인"}
                </dd>
              </div>
            </dl>
            <div className="product-quantity">
              <label htmlFor="productQuantity">수량</label>
              <div>
                <button
                  aria-label="수량 줄이기"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => q - 1)}
                >
                  <Minus size={16} />
                </button>
                <input
                  id="productQuantity"
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(
                        1,
                        Math.min(99, Math.floor(Number(e.target.value) || 1)),
                      ),
                    )
                  }
                />
                <button
                  aria-label="수량 늘리기"
                  disabled={quantity >= 99}
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="product-total">
              <span>
                총 참고금액 <small>({quantity}개)</small>
              </span>
              <strong>{won(total)}</strong>
            </div>
            <div className="product-order-actions">
              <button
                className="btn btn-solid"
                onClick={() => onAdd(product, quantity)}
              >
                <ShoppingBag size={19} />
                장바구니 담기
              </button>
              <button
                className="btn btn-outline"
                aria-label={isFavorite ? "찜 해제" : "찜하기"}
                aria-pressed={isFavorite}
                onClick={() => onFavorite(product.id)}
              >
                <Heart size={21} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
            <a
              className="product-store-link"
              href={
                product.smartstoreUrl || "https://smartstore.naver.com/ymgbeans"
              }
              target="_blank"
              rel="noreferrer"
            >
              스마트스토어에서 구매 정보 확인
              <ExternalLink size={16} />
            </a>
            <p className="product-reference-note">
              공개 판매자료의 참고가격입니다. 최신 가격·옵션·재고·배송비는
              판매처에서 확인해주세요. 장바구니가 판매처로 자동 전송되지는
              않습니다.
            </p>
          </div>
        </section>
      </div>
      <nav className="product-section-nav" aria-label="상품 상세 메뉴">
        <div className="container">
          <button aria-pressed={tap === 0} onClick={() => setTap(0)}>상품 요약</button>
          <button aria-pressed={tap === 1} onClick={() => setTap(1)}>가공 정보</button>
          <button aria-pressed={tap === 2} onClick={() => setTap(2)}>보관 안내</button>
          <button onClick={() => scrollTo("product-story")}>상품 정보</button>
          <button onClick={() => scrollTo("product-origin")}>
            산지 이야기
          </button>
          <button onClick={() => scrollTo("product-guide")}>
            보관·구매 안내
          </button>
          <button onClick={() => scrollTo("product-related")}>
            함께 살펴볼 생두
          </button>
        </div>
      </nav>
      <TabContent tap={tap} product={product} />
      <Reveal>
        <section className="product-story section-pad" id="product-story">
          <div className="container product-editorial-grid">
            <div>
              <p className="eyebrow">THE CHARACTER OF ORIGIN</p>
              <h2>
                당신의 다음 로스팅을
                <br />
                기다리는 생두
              </h2>
            </div>
            <div>
              <p className="product-lead">
                {origin.korean}에서 시작되는 커피의 가능성.
              </p>
              <p>
                {product.name}을 만나보세요. 산지와 가공 방식은 생두를 살펴보는
                출발점입니다. 로스팅 정도와 추출 방식에 따라 달라지는 커피의
                표현을 탐색해보세요.
              </p>
              <dl className="product-info-table">
                <div>
                  <dt>상품명</dt>
                  <dd>{product.name}</dd>
                </div>
                <div>
                  <dt>지역 분류</dt>
                  <dd>
                    {region.label} / {origin.korean}
                  </dd>
                </div>
                <div>
                  <dt>가공</dt>
                  <dd>{process}</dd>
                </div>
                <div>
                  <dt>중량</dt>
                  <dd>
                    {product.unitKg ? `${product.unitKg}kg` : "판매처 확인"}
                  </dd>
                </div>
                <div>
                  <dt>품종·고도·커핑 노트</dt>
                  <dd>현재 판매 로트의 상세정보는 판매처에서 확인해주세요.</dd>
                </div>
              </dl>
              <details className="product-source">
                <summary>상품 정보 출처</summary>
                <p>
                  동일 업체의 공개 판매 이력을 바탕으로 구성했습니다. 현재
                  스마트스토어 판매 구성과 다를 수 있습니다.
                </p>
                <a href={product.sourceUrl} target="_blank" rel="noreferrer">
                  확인한 판매자료 보기 <ExternalLink size={14} />
                </a>
              </details>
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="product-origin-story" id="product-origin">
          <div className="product-origin-photo">
            <img
              src={origin.image}
              alt={origin.photoAlt}
              width="1600"
              height="1000"
              loading="lazy"
            />
            <span>{origin.caption}</span>
          </div>
          <div className="product-origin-copy">
            <p className="eyebrow">FROM THE ORIGIN</p>
            <h2>
              {origin.korean}
              <small>{product.country}</small>
            </h2>
            <p>
              커피가 자라는 현장의 풍경을 만나보세요. 산지를 알고 마시는 한
              잔에는 더 많은 이야기가 담깁니다.
            </p>
            <p className="product-photo-note">
              산지 소개용 사진이며 이 상품의 생산 농장이나 판매 로트를 특정하지
              않습니다.
            </p>
            <button
              className="text-link"
              onClick={() => onCountry(product.country)}
            >
              {origin.korean} 생두 모두 보기
              <ArrowUpRight size={18} />
            </button>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="section-pad product-guide" id="product-guide">
          <div className="container">
            <p className="eyebrow">BEFORE YOUR FIRST ROAST</p>
            <h2>생두를 만나기 전, 알아두세요</h2>
            <div className="product-guide-grid">
              <article>
                <span>01 / GREEN COFFEE</span>
                <h3>로스팅 전의 생두입니다</h3>
                <p>
                  볶은 원두가 아닌 생두 상품입니다. 로스팅한 후 분쇄·추출하여
                  즐겨주세요.
                </p>
              </article>
              <article>
                <span>02 / STORAGE</span>
                <h3>습기와 직사광선을 피해</h3>
                <p>
                  서늘하고 건조한 곳에 보관하고, 강한 냄새와 습기에 노출되지
                  않도록 관리해주세요. 상품별 보관 안내가 있다면 해당 안내를
                  우선해주세요.
                </p>
              </article>
              <article>
                <span>03 / ORDER</span>
                <h3>구매 전 판매정보 확인</h3>
                <p>
                  최신 옵션·재고·배송일·배송비와 교환·반품 조건은
                  스마트스토어에서 확인할 수 있습니다. 이 페이지에서 결제나
                  주문이 접수되지는 않습니다.
                </p>
              </article>
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="section-pad product-related" id="product-related">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">CONTINUE YOUR EXPLORATION</p>
                <h2>함께 살펴볼 생두</h2>
              </div>
              <button className="text-link" onClick={onShop}>
                전체 생두 보기
                <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="product-grid">
              {related.map((p) => (
                <Products
                  key={p.id}
                  product={p}
                  onAdd={onAdd}
                  onDetail={onDetail}
                  onFavorite={onFavorite}
                  favorites={favorites}
                />
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}

function TabContent(props) {
  return <div className="container section-pad" role="region" aria-label="선택한 상품 정보">
    {[
      <p key="summary">{props.product.name} · {props.product.country} · {props.product.unitKg}kg</p>,
      <p key="process">가공 방식: {props.product.process}</p>,
      <p key="storage">직사광선과 습기를 피해 서늘하고 건조한 곳에 보관하세요.</p>
    ][props.tap]}
  </div>;
}
