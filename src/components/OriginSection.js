import { useState } from "react";
import { regions, regionForCountry } from "../db/categories";
import { ArrowUpRight } from "lucide-react";

export default function OriginSection({ origins, products, onCountry }) {
  const [region, setRegion] = useState("africa");
  const shown = origins.filter((o) => regionForCountry[o.country] === region);
  return (
    <section
      className="origin section-pad"
      id="origin"
      aria-labelledby="originTitle"
    >
      <div className="container">
        <div className="section-heading split-heading align-end">
          <div>
            <p className="eyebrow">EXPLORE THE WORLD</p>
            <h2 id="originTitle">커피로 만나는 세계</h2>
          </div>
          <p>
            좋아하는 국가에서 시작하는 생두 여행.
            <br />
            산지 사진을 눌러 그 나라의 생두를 만나보세요.
          </p>
        </div>
        <div className="origin-region-tabs" aria-label="산지 지역">
          {regions.map((r) => (
            <button
              key={r.id}
              aria-pressed={region === r.id}
              onClick={() => setRegion(r.id)}
            >
              {r.label} <small>{r.countries.length}</small>
            </button>
          ))}
        </div>
        <div className="origin-grid" key={region}>
          {shown.map((origin, index) => (
            <button
              key={origin.country}
              className={`origin-card ${index < 2 ? "large" : ""}`}
              onClick={() => onCountry(origin.country)}
              aria-label={`${origin.korean} 생두 ${products.filter((product) => product.country === origin.country).length}종 보기`}
            >
              <img
                className="origin-photo"
                src={origin.image}
                alt={origin.photoAlt}
                width="1400"
                height="850"
                loading="lazy"
              />
              <span className="origin-card-copy">
                <span>
                  {String(index + 1).padStart(2, "0")} · {origin.continent}
                </span>
                <h3>
                  {origin.country}
                  <small>{origin.korean}</small>
                </h3>
                <p>{origin.flavor}</p>
                <span className="country-link">
                  생두{" "}
                  {
                    products.filter(
                      (product) => product.country === origin.country,
                    ).length
                  }
                  종 보기 <ArrowUpRight size={18} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
