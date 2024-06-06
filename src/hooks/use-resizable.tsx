import { PointerEventHandler, PointerEvent as SyntheticPointerEvent, useCallback, useState } from 'react';

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export type Transform = { x: number; y: number; w: number; h: number };

export type Delta = { x: number; y: number };

export type ResizeEvent = (data: {
  transform: Transform;
  delta: Delta;
  event: PointerEvent;
  handle?: ResizeDirection;
}) => void;

export type UseResizableOptions = {
  onResizeStart?: (data: { event: SyntheticPointerEvent; handle?: ResizeDirection }) => void;
  onResize?: ResizeEvent;
  onResizeEnd?: ResizeEvent;
};

const directionMultiplicationMatrix: Record<ResizeDirection, Transform> = {
  n: {
    x: 0,
    y: 1,
    w: 0,
    h: -1,
  },
  s: {
    x: 0,
    y: 0,
    w: 0,
    h: 1,
  },
  e: {
    x: 0,
    y: 0,
    w: 1,
    h: 0,
  },
  w: {
    x: 1,
    y: 0,
    w: -1,
    h: 0,
  },
  ne: {
    x: 0,
    y: 1,
    w: 1,
    h: -1,
  },
  nw: {
    x: 1,
    y: 1,
    w: -1,
    h: -1,
  },
  se: {
    x: 0,
    y: 0,
    w: 1,
    h: 1,
  },
  sw: {
    x: 1,
    y: 0,
    w: -1,
    h: 1,
  },
};

export const useResizable = ({ onResizeStart, onResize, onResizeEnd }: UseResizableOptions) => {
  const [transform, setTransform] = useState<Transform>();

  const getListenerForDirection = useCallback(
    (handleDir: ResizeDirection): { onPointerDown: PointerEventHandler } => {
      return {
        onPointerDown: (event) => {
          setTransform({
            x: 0,
            y: 0,
            w: 0,
            h: 0,
          });

          onResizeStart && onResizeStart({ event, handle: handleDir });

          const getDeltaAndTransform = (pmEvent: PointerEvent) => {
            const delta = {
              x: pmEvent.clientX - event.clientX,
              y: pmEvent.clientY - event.clientY,
            };

            const matrix = directionMultiplicationMatrix[handleDir];

            return {
              delta,
              newTransform: {
                x: matrix.x * delta.x,
                y: matrix.y * delta.y,
                w: matrix.w * delta.x,
                h: matrix.h * delta.y,
              } satisfies Transform,
            };
          };

          const pointerMoveHandler = (pmEvent: PointerEvent) => {
            const { delta, newTransform } = getDeltaAndTransform(pmEvent);

            onResize && onResize({ delta, event: pmEvent, transform: newTransform, handle: handleDir });

            setTransform(newTransform);
          };

          const pointerUpHandler = (pmEvent: PointerEvent) => {
            document.removeEventListener('pointermove', pointerMoveHandler);
            document.removeEventListener('pointerup', pointerUpHandler);

            const { delta, newTransform } = getDeltaAndTransform(pmEvent);

            onResizeEnd && onResizeEnd({ event: pmEvent, delta, transform: newTransform, handle: handleDir });

            setTransform(undefined);
          };

          document.addEventListener('pointermove', pointerMoveHandler);
          document.addEventListener('pointerup', pointerUpHandler);
        },
      };
    },
    [onResizeStart, onResize, onResizeEnd],
  );

  return {
    getHandleListeners: getListenerForDirection,
    transform,
  };
};
