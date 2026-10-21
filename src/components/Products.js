import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { processNames } from "../db/categories";
export const won = (value) =>
  typeof value === "number" && Number.isFinite(value)
    ? `${value.toLocaleString("ko-KR")}원`
    : "가격 확인";
export default function Products(props) {
  // 예제의 props.fruit에 해당하는 한 개의 생두 데이터입니다.
  let { product, rank, onAdd, favorites = [], onFavorite } = props;
  const liked = favorites.includes(product.id);
  return (
    <article className="product-card">
      <div className="product-img">
        <Link
          className="product-image-button"
          to={`/detail/${product.id}`}
          aria-label={`${product.name} 상세 보기`}
        >
          <img
            src={product.image}
            alt={`${product.name} — 생두 연출 이미지`}
            width="1254"
            height="1254"
            loading="lazy"
          />
        </Link>
        {product.categories.includes("decaf") ? (
          <span className="badge">DECAF</span>
        ) : product.categories.includes("anaerobic") ? (
          <span className="badge">ANAEROBIC</span>
        ) : (
          rank && <span className="rank">{String(rank).padStart(2, "0")}</span>
        )}
        <button
          className={`heart ${liked ? "liked" : ""}`}
          onClick={() => onFavorite(product.id)}
          aria-pressed={liked}
          aria-label={`${product.name} ${liked ? "찜 해제" : "찜하기"}`}
        >
          <Heart
            size={19}
            strokeWidth={1.5}
            fill={liked ? "currentColor" : "none"}
          />
        </button>
      </div>
      <div className="product-meta">
        <span className="country">{product.country}</span>
        <h3>
          <Link to={`/detail/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-english">{product.englishName}</p>
        <p className="process">
          {processNames[product.process] || product.process}
          {product.unitKg ? ` · ${product.unitKg}kg` : ""}
        </p>
        <div className="price-row">
          <div>
            {product.price !== null && (
              <small className="reference-price">참고가격</small>
            )}
            <strong>{won(product.price)}</strong>
          </div>
          <button
            className="add-btn"
            onClick={() => onAdd(product)}
            aria-label={`${product.name} 장바구니 담기`}
          >
            담기 <Plus size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}
