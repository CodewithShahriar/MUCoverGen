import { useEffect, useRef, useState, type ReactNode } from "react";

const A4_W = 793.7; // 210mm @96dpi
const A4_H = 1122.5; // 297mm @96dpi

export function SheetScaler({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      if (w > 0) setScale(Math.min(1, w / A4_W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="sheet-scaler w-full max-w-full overflow-hidden"
      style={{ height: A4_H * scale }}
    >
      <div
        className="sheet-scaler-inner origin-top-left"
        style={{ transform: `scale(${scale})`, width: A4_W, height: A4_H }}
      >
        {children}
      </div>
    </div>
  );
}
