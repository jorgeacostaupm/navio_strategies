import { useEffect, useRef } from "react";
import navio from "navio";

export default function NavioExample({ data }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!data.length) return;
    const chart = navio(containerRef.current, {
      height: 400,
      settingsKey: null,
    });
    chart.data(data);
    chart.addAllAttribs();
    return () => chart.destroy();
  }, [data]);

  return (
    <div
      ref={containerRef}
      aria-label="Data explorer"
      style={{ textAlign: "left" }}
    />
  );
}
