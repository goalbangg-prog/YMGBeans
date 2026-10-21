import { ArrowUpRight } from "lucide-react";
import { won } from "./Products";
export default function YmgPick({ product, onDetail }) {
  return (
    <section className="ymg-pick section-pad" aria-labelledby="pickTitle">
      <div className="container pick-card">
        <div className="pick-visual">
          <img
            className="pick-photo"
            src={product.image}
            alt="생두 파우치와 커피 가지를 담은 연출 이미지"
            width="1254"
            height="1254"
            loading="lazy"
          />
          <span>YMG CURATION · GREEN COFFEE</span>
        </div>
        <div className="pick-copy">
          <p className="eyebrow light">A CLOSER LOOK</p>
          <h2 id="pickTitle">
            한 걸음 더 깊게,
            <br />
            {product.country}
          </h2>
          <p className="pick-origin">{product.englishName}</p>
          <div className="flavor-row">
            <span className="flavor-chip sweet">{product.process}</span>
          </div>
          <p className="pick-desc">
            {product.name}.
            <br />
            익숙한 국가 안에서도 지역과 가공 방식에 따라 달라지는 커피의
            가능성을 만나보세요.
          </p>
          <div className="pick-bottom">
            <strong>
              {won(product.price)} <small>참고가격 / 1kg</small>
            </strong>
            <button className="btn btn-light" onClick={() => onDetail(product)}>
              상품 보기 <ArrowUpRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
