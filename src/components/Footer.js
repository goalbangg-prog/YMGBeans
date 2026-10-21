import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Modal from "./Modal";
import credits from "../db/photoCredits.json";
export default function Footer({ onShop, onCategory, isAbout }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!isAbout && (
        <section className="about-teaser">
          <div className="container about-teaser-grid">
            <div>
              <p className="eyebrow">ABOUT YMG BEANS</p>
              <h2>
                세계의 생두를,
                <br />
                당신만의 커피로
              </h2>
            </div>
            <div>
              <p>
                산지의 개성을 발견하고, 나만의 로스팅으로 완성하는 한 잔.
                <br />
                YMG Beans가 제안하는 커피의 시작을 만나보세요.
              </p>
              <Link className="text-link" to="/about">
                YMG 이야기 <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-logo">YMG BEANS</div>
            <p>Special Beans From Around the World</p>
          </div>
          <div>
            <strong>SHOP</strong>
            <button onClick={onShop}>전체 생두</button>
            <button onClick={() => onCategory("decaf")}>디카페인</button>
            <button onClick={() => onCategory("anaerobic")}>무산소 발효</button>
          </div>
          <div>
            <strong>EXPLORE</strong>
            <Link to="/#origin">국가별 생두</Link>
            <Link to="/#finder">취향별 생두</Link>
            <a
              href="https://smartstore.naver.com/ymgbeans"
              target="_blank"
              rel="noreferrer"
            >
              공식 스마트스토어 ↗
            </a>
          </div>
          <div>
            <strong>YMG BEANS</strong>
            <Link to="/about">회사소개</Link>
            <button onClick={() => setOpen(true)}>이미지 출처</button>
            <a href={`${process.env.PUBLIC_URL}/brand/ymg-beans-logo.png`} download="YMG-BEANS-logo.png">
              브랜드 로고
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 YMG BEANS</span>
          <span>SPECIAL GREEN COFFEE CURATION</span>
        </div>
      </footer>
      <Modal open={open} onClose={() => setOpen(false)} title="이미지 출처">
        <p className="credits-intro">
          상품용 생두 사진 3종은 새로 제작한 AI 연출 이미지입니다. 원본
          스마트스토어의 상품 이미지는 사용하지 않았습니다. 국가별 사진은 아래
          현지 사진을 사용합니다. 각 사진은 산지 소개용이며 판매 상품의 생산
          농장을 특정하지 않습니다.
        </p>
        <ul className="photo-credits">
          {credits
            .filter((item) => item.id !== "green-beans")
            .map((item) => (
              <li key={item.id}>
                <a href={item.source} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
                <p>
                  {item.author} ·{" "}
                  <a href={item.licenseUrl} target="_blank" rel="noreferrer">
                    {item.license}
                  </a>
                </p>
                <small>
                  크기 조정·WebP 변환·화면 비율에 따른 잘라보기. 각 사진 원
                  라이선스 유지.
                </small>
              </li>
            ))}
        </ul>
        <p className="credits-intro">
          지도:{" "}
          <a
            href="https://www.naturalearthdata.com/about/terms-of-use/"
            target="_blank"
            rel="noreferrer"
          >
            Natural Earth · Public Domain
          </a>
        </p>
      </Modal>
    </>
  );
}
