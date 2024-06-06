import type { Story, StoryDefault } from '@ladle/react';
import { useMemo, useState } from 'react';
import { useResizable } from '../../src';

// More on how to set up stories at: https://ladle.dev/docs/stories
export default {
  title: 'Basic',
} satisfies StoryDefault;

export const XAndY: Story = () => {
  const [pos, setPos] = useState({ left: 0, top: 0, width: 150, height: 150 });

  const { transform, getHandleListeners } = useResizable({
    onResizeEnd: ({ transform }) => {
      setPos((prev) => ({
        left: prev.left + (transform.x ?? 0),
        top: prev.top + (transform.y ?? 0),
        width: prev.width + (transform.w ?? 0),
        height: prev.height + (transform.h ?? 0),
      }));
    },
  });

  const transformedPos = useMemo(
    () => ({
      left: pos.left + (transform?.x ?? 0),
      top: pos.top + (transform?.y ?? 0),
      width: pos.width + (transform?.w ?? 0),
      height: pos.height + (transform?.h ?? 0),
    }),
    [transform],
  );

  return (
    <div
      style={{
        ...transformedPos,
        border: '1px solid black',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      <p>
        {Math.round(transformedPos.width)}px x {Math.round(transformedPos.height)}px
      </p>
      <div
        style={{
          position: 'absolute',
          right: 5,
          top: '50%',
          width: 5,
          height: 50,
          cursor: 'e-resize',
          background: 'black',
          transform: 'translate(0, -50%)',
        }}
        {...getHandleListeners('e')}
      />
      <div
        style={{
          position: 'absolute',
          left: 5,
          top: '50%',
          width: 5,
          height: 50,
          cursor: 'w-resize',
          background: 'black',
          transform: 'translate(0, -50%)',
        }}
        {...getHandleListeners('w')}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 5,
          left: '50%',
          width: 50,
          height: 5,
          cursor: 's-resize',
          background: 'black',
          transform: 'translate(-50%, 0)',
        }}
        {...getHandleListeners('s')}
      />
      <div
        style={{
          position: 'absolute',
          top: 5,
          left: '50%',
          width: 50,
          height: 5,
          cursor: 'n-resize',
          background: 'black',
          transform: 'translate(-50%, 0)',
        }}
        {...getHandleListeners('n')}
      />
    </div>
  );
};
