import bezier from "bezier-easing";
import { useEffect, useMemo, useState } from "react";

// TODO move to types.ts
export type CubicBezierTuple = [number, number, number, number];
interface Options {
  initial?: number;
  minChange?: number;
}
type UseBezier = (
  target: number,
  durationF: number | ((lastValue: number) => number),
  coords: CubicBezierTuple,
  options?: Options
) => number;

const useBezier: UseBezier = (
  target,
  durationF,
  coords,
  { initial = 0, minChange } = {}
) => {
  const [trans, setTrans] = useState(initial);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const easing = useMemo(() => bezier(...coords), coords);

  useEffect(() => {
    const nowTime = Date.now();
    const duration =
      typeof durationF === "number" ? durationF : durationF(trans);
    let frameId: null | number = null;
    let lastRenderValue = trans;
    animate();
		
    function animate() {
      const progress = Math.min(
        1,
        Math.abs((Date.now() - nowTime) / (duration || 1))
      );
      const easedProgress = easing(progress);
      const newValue = trans * (1 - easedProgress) + target * easedProgress;
      if (!minChange || Math.abs(lastRenderValue - newValue) > minChange) {
        setTrans(trans * (1 - easedProgress) + target * easedProgress);
        lastRenderValue = newValue;
      }
      if (progress < 1) frameId = requestAnimationFrame(animate);
    }

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [target, easing, durationF, minChange]);

  return trans;
};

export default useBezier;
