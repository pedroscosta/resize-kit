import { Modifier } from '../hooks/use-resizable';

export const createSnapModifier = (gridSize: number | [number, number]): Modifier => {
  const actualGridSize = typeof gridSize === 'number' ? [gridSize, gridSize] : gridSize;

  return ({ transform }) => {
    return {
      x: Math.round(transform.x / actualGridSize[0]) * actualGridSize[0],
      w: Math.round(transform.w / actualGridSize[0]) * actualGridSize[0],
      y: Math.round(transform.y / actualGridSize[1]) * actualGridSize[1],
      h: Math.round(transform.h / actualGridSize[1]) * actualGridSize[1],
    };
  };
};
