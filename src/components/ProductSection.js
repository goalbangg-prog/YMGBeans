import Products from "./Products";
export default function ProductSection({ type, products, onShop, ...actions }) {
  const items =
    type === "new"
      ? products.filter((p) => p.featured)
      : products.filter((p) => p.isBest);
  return (
    <section
      className="products section-pad"
      id={type}
      aria-labelledby={`${type}Title`}
    >
      <div className="container">
        <div className="section-heading split-heading align-end">
          <div>
            <p className="eyebrow">
              {type === "new"
                ? "MEET YOUR NEXT BEANS"
                : "MORE ORIGINS, MORE POSSIBILITIES"}
            </p>
            <h2 id={`${type}Title`}>
              {type === "new" ? "지금 살펴볼 생두" : "다양한 산지의 생두"}
            </h2>
          </div>
          <button className="text-link" onClick={onShop}>
            전체보기 →
          </button>
        </div>
        <div className="product-grid">
          {items.map((product) => (
            <Products key={product.id} product={product} {...actions} />
          ))}
        </div>
      </div>
    </section>
  );
}
