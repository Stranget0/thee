import bezier from "bezier-easing";
import { useEffect, useMemo, useRef, useState } from "react";

export type CubicBezierTuple = [number, number, number, number];
const useBezier = (
  target: number,
  durationF: (lastValue: number) => number,
  coords: CubicBezierTuple,
  initial = 0
) => {
  const [trans, setTrans] = useState(initial);
  const startPoint = useRef(0);
  const from = useRef(initial);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const easing = useMemo(() => bezier(...coords), coords);
  useEffect(() => {
    startPoint.current = Date.now();
    from.current = trans;
    const duration = durationF(trans);
    let frameId: null | number = null;

    function animate() {
      const progress = Math.min(
        1,
        Math.abs((Date.now() - startPoint.current) / (duration || 1))
      );
      const easedProgress = easing(progress);
      setTrans(from.current * (1 - easedProgress) + target * easedProgress);
      console.log({ progress: easedProgress });
      if (progress < 1) frameId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [target, easing]);
  return trans;
};

export default useBezier;
