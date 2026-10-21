import { useEffect, useRef } from "react";
// 모션 감소 설정이나 미지원 브라우저에서는 내용을 숨기지 않습니다.
export default function Reveal({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (
      !window.IntersectionObserver ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 30) return;
    element.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.classList.remove("reveal-pending");
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -35px 0px" },
    );
    observer.observe(element);
    const revealOnFocus = () => element.classList.remove("reveal-pending");
    element.addEventListener("focusin", revealOnFocus);
    return () => {
      observer.disconnect();
      element.removeEventListener("focusin", revealOnFocus);
    };
  }, []);
  return (
    <div ref={ref} className="reveal-section">
      {children}
    </div>
  );
}
