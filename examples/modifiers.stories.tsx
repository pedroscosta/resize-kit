import type { Story } from '@ladle/react';
import { boundToParentElement } from '../src';
import { ResizableComponent } from './ResizableComponent';

export const BoundToParent: Story = () => {
  return (
    <div style={{ border: '1px solid black', width: 500, height: 500 }}>
      <ResizableComponent modifiers={[boundToParentElement]} />
    </div>
  );
};
