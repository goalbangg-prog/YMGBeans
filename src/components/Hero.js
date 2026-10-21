import { regions, regionForCountry } from "../db/categories";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import OriginGlobe from "./OriginGlobe";
import HeroBackground from "./HeroBackground";
const normLon = (value) => ((value + 540) % 360) - 180;
export default function Hero({
  origins,
  originIndex,
  onSelect,
  onCountry,
  onShop,
  products,
}) {
  const [center, setCenter] = useState({
    lat: origins[0].lat,
    lon: origins[0].lon,
  });
  const centerRef = useRef(center);
  const activeOrigin = origins[originIndex];
  useEffect(() => {
    const target = origins[originIndex];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      centerRef.current = { lat: target.lat, lon: target.lon };
      setCenter(centerRef.current);
      return;
    }
    const start = performance.now();
    const from = centerRef.current;
    const deltaLon = normLon(target.lon - from.lon);
    let frame;
    function animate(now) {
      const progress = Math.min(1, (now - start) / 850);
      const eased = 1 - (1 - progress) ** 3;
      const next = {
        lat: from.lat + (target.lat - from.lat) * eased,
        lon: normLon(from.lon + deltaLon * eased),
      };
      centerRef.current = next;
      setCenter(next);
      if (progress < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [originIndex, origins]);
  const select = (index) => onSelect((index + origins.length) % origins.length);
  return (
    <section className="hero" aria-labelledby="heroTitle">
      <HeroBackground origins={origins} activeIndex={originIndex} />
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow light">SPECIAL GREEN COFFEE CURATION</p>
          <h1 id="heroTitle">
            SPECIAL BEANS
            <br />
            FROM AROUND
            <br />
            THE WORLD
          </h1>
          <p className="hero-kicker">
            세계 각국의 특별한 생두를
            <br />
            YMG Beans에서 만나보세요
          </p>
          <p className="hero-desc">
            산지마다 다른 기후와 토양, 가공 방식이 만든 개성을 발견합니다.
          </p>
          <div className="hero-actions">
            <button className="btn btn-light" onClick={onShop}>
              세계의 생두 둘러보기
            </button>
            <a className="btn btn-ghost" href="#finder">
              취향으로 찾기 <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="origin-explorer" aria-label="국가별 생두 탐색">
          <div className="globe-shell">
            <button
              className="dial-arrow prev"
              onClick={() => select(originIndex - 1)}
              aria-label="이전 국가"
            >
              <ArrowLeft size={18} />
            </button>
            <OriginGlobe
              origins={origins}
              activeIndex={originIndex}
              centerLat={center.lat}
              centerLon={center.lon}
              onSelect={select}
            />
            <button
              className="dial-arrow next"
              onClick={() => select(originIndex + 1)}
              aria-label="다음 국가"
            >
              <ArrowRight size={18} />
            </button>
          </div>
          <div
            className="origin-info"
            aria-live="polite"
            key={activeOrigin.country}
          >
            <div className="origin-count">
              {String(originIndex + 1).padStart(2, "0")} /{" "}
              {String(origins.length).padStart(2, "0")}
            </div>
            <p className="origin-continent">{activeOrigin.continent}</p>
            <h2>{activeOrigin.country}</h2>
            <strong>{activeOrigin.korean}</strong>
            <p>{activeOrigin.flavor}</p>
            <button
              className="text-button"
              onClick={() => onCountry(activeOrigin.country)}
            >
              {activeOrigin.korean} 생두{" "}
              {
                products.filter(
                  (product) => product.country === activeOrigin.country,
                ).length
              }
              종 보기 <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="globe-region-tabs" aria-label="지구본 지역">
            {regions.map((region) => (
              <button
                key={region.id}
                aria-pressed={
                  regionForCountry[activeOrigin.country] === region.id
                }
                onClick={() =>
                  select(
                    origins.findIndex(
                      (origin) =>
                        regionForCountry[origin.country] === region.id,
                    ),
                  )
                }
              >
                {region.label}
              </button>
            ))}
          </div>
          <div className="origin-tabs" aria-label="국가 선택">
            {origins.map(
              (origin, index) =>
                regionForCountry[origin.country] ===
                  regionForCountry[activeOrigin.country] && (
                  <button
                    key={origin.country}
                    className={`origin-tab ${index === originIndex ? "active" : ""}`}
                    aria-pressed={index === originIndex}
                    onClick={() => select(index)}
                  >
                    {origin.korean}
                  </button>
                ),
            )}
          </div>
        </div>
      </div>
      <div className="hero-caption">PHOTO · {activeOrigin.caption}</div>
    </section>
  );
}
