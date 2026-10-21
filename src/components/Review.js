export default function Review() {
  const reviews = [
    [
      "홈로스팅용으로 여러 번 구매했는데 생두 상태가 늘 안정적이에요",
      "ETHIOPIA GUJI G1",
    ],
    ["산지가 다양해서 새로운 생두를 고르는 재미가 있습니다", "COLOMBIA HUILA"],
    ["설명이 직관적이라 원하는 향미의 생두를 찾기 편했어요", "KENYA AA"],
  ];
  return (
    <section className="review section-pad" aria-labelledby="reviewTitle">
      <div className="container review-grid">
        <div className="review-head">
          <p className="eyebrow">COFFEE PEOPLE LOVE</p>
          <h2 id="reviewTitle">
            커피를 즐기는
            <br />
            사람들의 이야기
          </h2>
          <p className="review-example">후기 예시</p>
        </div>
        <div className="review-list">
          {reviews.map(([text, meta]) => (
            <article key={meta}>
              <span aria-label="별점 5점">★★★★★</span>
              <p>“{text}”</p>
              <small>{meta}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
