import { useEffect, useRef } from "react";
import navio from "navio";

export default function NavioExample({ data, height = 500 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!data.length) return;
    const nv = navio(containerRef.current, {
      height,
      settingsKey: null,
      attribWidth: 60,
    });
    nv.data(data);
    nv.addAllAttribs([
      "RVPA",
      "RVPLSD",
      "RVPMDL",
      "RVPML",
      "RVPPFA",
      "RVPPH",
      "RVPTFA",
      "RVPTH",
      "RVPTM",
    ]);
    return () => nv.destroy();
  }, [data]);

  return (
    <div
      ref={containerRef}
      aria-label="Data explorer"
      style={{ textAlign: "left" }}
    />
  );
}
