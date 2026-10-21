import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { finderCopy, tasteOptions } from "../db/flavors";
export default function BeanFinder({ products, onExplore, onDetail, onAdd }) {
  const [profile, setProfile] = useState("chocolate");
  const [title, description] = finderCopy[profile];
  const matches = products.filter((product) =>
    product.profile.includes(profile),
  );
  return (
    <section
      className="finder section-pad"
      id="finder"
      aria-labelledby="finderTitle"
    >
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">FIND YOUR BEANS</p>
            <h2 id="finderTitle">어떤 커피를 좋아하세요?</h2>
          </div>
          <p>
            마음이 가는 향과 맛을 골라보세요.
            <br />그 취향을 출발점으로 생두를 탐색해보세요.
          </p>
        </div>
        <div className="taste-grid" aria-label="향미 카테고리">
          {tasteOptions.map((option) => (
            <button
              key={option.id}
              className={`taste-card taste-${option.id} ${profile === option.id ? "active" : ""}`}
              aria-pressed={profile === option.id}
              onClick={() => setProfile(option.id)}
            >
              <span className="taste-top">
                <span className="taste-num">{option.number}</span>
                {profile === option.id ? (
                  <Check size={19} />
                ) : (
                  <ArrowUpRight size={19} />
                )}
              </span>
              <strong>{option.title}</strong>
              <small>{option.subtitle}</small>
            </button>
          ))}
        </div>
        <div className="finder-result" key={profile}>
          <div className="finder-result-copy" aria-live="polite">
            <span className="result-label">TASTE EXPLORATION</span>
            <strong>{title}</strong>
            <p>{description}</p>
            <button className="text-link" onClick={() => onExplore(profile)}>
              이 취향으로 {matches.length}종 탐색 <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="finder-mini-grid">
            {matches.slice(0, 3).map((product) => (
              <article key={product.id} className="mini-match">
                <button
                  className="mini-product"
                  onClick={() => onDetail(product)}
                >
                  <img
                    src={product.image}
                    alt="생두 연출 이미지"
                    loading="lazy"
                    width="240"
                    height="150"
                  />
                  <span>{product.country}</span>
                  <strong>{product.name}</strong>
                  <small>{product.englishName}</small>
                </button>
                <button className="mini-add" onClick={() => onAdd(product)}>
                  담기 +
                </button>
              </article>
            ))}
          </div>
        </div>
        <p className="taste-guide-note">
          산지와 상품 유형을 바탕으로 제안하는 탐색 가이드입니다. 실제 상품별
          커핑 노트와는 다를 수 있어요.
        </p>
      </div>
    </section>
  );
}
