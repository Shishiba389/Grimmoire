import { useState, useRef, useCallback } from "react";

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

export default function ImagePreview({ src, alt = "", className = "" }: Props) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const thumbRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleEnter = useCallback(() => {
    timer.current = setTimeout(() => {
      if (thumbRef.current) {
        const rect = thumbRef.current.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const previewW = 400;
        const previewH = 400;

        let x = rect.right + 12;
        let y = rect.top;

        if (x + previewW > vw) x = rect.left - previewW - 12;
        if (y + previewH > vh) y = vh - previewH - 16;
        if (y < 8) y = 8;

        setPos({ x, y });
        setShow(true);
      }
    }, 300);
  }, []);

  const handleLeave = useCallback(() => {
    clearTimeout(timer.current);
    setShow(false);
  }, []);

  return (
    <>
      <div
        ref={thumbRef}
        className={`img-thumb ${className}`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <img src={src} alt={alt} loading="lazy" />
      </div>

      {show && (
        <div
          className="img-preview-popup"
          style={{ left: pos.x, top: pos.y }}
        >
          <img src={src} alt={alt} />
        </div>
      )}
    </>
  );
}
