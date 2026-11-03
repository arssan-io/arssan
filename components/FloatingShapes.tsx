export interface ShapeConfig {
  left: string;
  top: string;
  size: number;
  depth: number;
  opacity: number;
  type: "ring" | "dot" | "cross" | "dashed-ring";
  drift?: number;
  rotate?: number;
}

export function FloatingShapes() {
  return null;
}

export const heroShapes: ShapeConfig[] = [];
export const processShapes: ShapeConfig[] = [];
export const servicesShapes: ShapeConfig[] = [];
