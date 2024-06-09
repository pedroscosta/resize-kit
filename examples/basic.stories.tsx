import type { Story, StoryDefault } from '@ladle/react';
import { ResizableComponent } from './ResizableComponent';

// More on how to set up stories at: https://ladle.dev/docs/stories
export default {
  title: 'Basic',
} satisfies StoryDefault;

export const XAndY: Story = () => {
  return <ResizableComponent />;
};
