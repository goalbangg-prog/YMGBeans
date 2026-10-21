import { useMemo } from "react";
import { geoOrthographic, geoPath, geoGraticule10, geoDistance } from "d3-geo";
import world from "../db/world.json";
// 실제 경계와 정사영을 사용해 대륙, 경위선, 산지를 동일하게 회전합니다.
export default function OriginGlobe({
  origins,
  activeIndex,
  centerLat,
  centerLon,
  onSelect,
}) {
  const projection = geoOrthographic()
    .translate([180, 180])
    .scale(145)
    .rotate([-centerLon, -centerLat])
    .clipAngle(90);
  const path = geoPath(projection);
  const graticule = useMemo(() => geoGraticule10(), []);
  return (
    <svg
      className="origin-globe"
      viewBox="0 0 360 360"
      role="group"
      aria-label="국가를 선택하는 회전 지구본"
    >
      <circle cx="180" cy="180" r="145" className="sphere" />
      <path d={path(world)} className="globe-land" />
      <path d={path(graticule)} className="grid-line" />
      {origins.map((origin, index) => {
        if (
          geoDistance([origin.lon, origin.lat], [centerLon, centerLat]) >=
          Math.PI / 2
        )
          return null;
        const [x, y] = projection([origin.lon, origin.lat]);
        return (
          <g
            key={origin.country}
            role="button"
            tabIndex={0}
            aria-label={`${origin.korean} 선택`}
            aria-pressed={activeIndex === index}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(index);
              }
            }}
            className="globe-marker"
          >
            <title>{origin.korean}</title>
            <circle cx={x} cy={y} r="13" fill="transparent" />
            <circle
              cx={x}
              cy={y}
              r={index === activeIndex ? 6 : 4}
              className={`origin-dot ${index === activeIndex ? "active" : ""}`}
            />
            {index === activeIndex && (
              <text
                x={x}
                y={y + 25}
                textAnchor="middle"
                className="origin-label"
              >
                {origin.country}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
