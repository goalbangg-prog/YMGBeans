import { useEffect, useState } from "react";
export default function HeroBackground({ origins, activeIndex }) {
  const [loaded, setLoaded] = useState({});
  const [displayIndex, setDisplayIndex] = useState(0);
  useEffect(() => {
    if (loaded[activeIndex]) setDisplayIndex(activeIndex);
  }, [activeIndex, loaded]);
  return (
    <div className="hero-photo-stack" aria-hidden="true">
      {origins.map((origin, index) => (
        <img
          key={origin.country}
          className={`hero-photo-layer ${displayIndex === index ? "is-current" : ""}`}
          src={origin.image}
          alt=""
          width="2560"
          height="1440"
          loading="eager"
          decoding="async"
          fetchpriority={index === 0 ? "high" : "low"}
          onLoad={() =>
            setLoaded((previous) =>
              previous[index] ? previous : { ...previous, [index]: true },
            )
          }
        />
      ))}
    </div>
  );
}
