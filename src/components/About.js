import { ArrowUpRight, Globe2, Sprout, Coffee } from "lucide-react";
import Reveal from "./Reveal";
export default function About({ onShop }) {
  return (
    <main className="about-page" id="about">
      <div className="container about-breadcrumb">
        <a href="#top">HOME</a>
        <span>/</span>
        <span>ABOUT YMG BEANS</span>
      </div>
      <section className="about-hero container">
        <div>
          <p className="eyebrow">SPECIAL BEANS, EVERY POSSIBILITY</p>
          <h1>
            한 알의 생두에서
            <br />
            시작되는
            <br />
            <em>새로운 가능성</em>
          </h1>
          <p>
            세계 각국의 스페셜한 생두를,
            <br />
            당신만의 커피로.
          </p>
        </div>
        <div className="about-photo">
          <img
            src={process.env.PUBLIC_URL + "/images/product-3.webp"}
            alt="생두와 코튼 파우치를 담은 브랜드 연출 이미지"
            width="1254"
            height="1254"
          />
          <span>YMG BEANS · GREEN COFFEE CURATION</span>
        </div>
      </section>
      <Reveal>
        <section className="about-manifesto container">
          <p className="eyebrow">OUR POINT OF VIEW</p>
          <h2>
            좋은 커피의 시작은
            <br />
            다름을 발견하는 일
          </h2>
          <div>
            <p>
              커피는 어느 땅에서 자랐는지, 어떻게 가공됐는지에 따라 서로 다른
              이야기를 품습니다. 로스팅 전의 생두에는 그 이야기를 나만의 커피로
              완성할 가능성이 담겨 있습니다.
            </p>
            <p>
              YMG Beans는 세계 각국의 생두를 만나는 여정을 제안합니다. 익숙한
              국가에서 시작해도 좋고, 마음에 드는 향과 맛을 따라 새로운 산지로
              향해도 좋습니다.
            </p>
            <p>
              매일 즐길 한 잔부터 새로운 로스팅을 위한 실험까지.
              <br />
              다양한 선택이 당신의 커피를 더 넓게 만들기를 바랍니다.
            </p>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="about-values">
          <div className="container">
            <p className="eyebrow">WHAT WE VALUE</p>
            <div className="about-value-grid">
              {[
                [
                  Globe2,
                  "01",
                  "다양한 산지",
                  "한 가지 기준으로 커피를 고르지 않습니다. 국가와 지역이 지닌 개성을 발견하는 즐거움을 전합니다.",
                ],
                [
                  Sprout,
                  "02",
                  "취향의 발견",
                  "복잡한 이름 앞에서도 선택은 쉽게. 원하는 향미를 출발점으로 새로운 커피를 만나도록 돕습니다.",
                ],
                [
                  Coffee,
                  "03",
                  "로스팅의 가능성",
                  "생두는 완성된 답이 아닌 시작입니다. 각자의 로스팅과 추출로 완성할 커피의 가능성을 생각합니다.",
                ],
              ].map(([Icon, number, title, copy]) => (
                <article key={number}>
                  <div>
                    <span>{number}</span>
                    <Icon size={28} strokeWidth={1.2} />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal>
        <section className="about-invitation container">
          <p className="eyebrow">YOUR NEXT COFFEE STARTS HERE</p>
          <h2>
            다음 커피는,
            <br />
            어디에서 시작할까요?
          </h2>
          <button className="btn btn-solid" onClick={onShop}>
            세계의 생두 만나기 <ArrowUpRight size={18} />
          </button>
        </section>
      </Reveal>
    </main>
  );
}
