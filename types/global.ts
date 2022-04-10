export type BezierPointsTuple = [number, number, number, number];
export type Action<T, P> = { type: T; payload: P };

export const sceneHeight = 20;
export const scrollBezierPoints: BezierPointsTuple = [0, 0.1, 0.1, 1];
