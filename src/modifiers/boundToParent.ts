import { Modifier } from '../hooks/use-resizable';

export const boundToParentElement: Modifier = ({ transform, target, originalRect }) => {
  // The event is dispatched on the handle, not the base element
  const parentRect = target.parentElement?.parentElement?.getBoundingClientRect();

  const value = { ...transform };

  if (!parentRect) return value;

  if (originalRect.right + transform.w >= parentRect.right) {
    value.w = parentRect.right - originalRect.right;
  }
  if (originalRect.bottom + transform.h >= parentRect.bottom) {
    value.h = parentRect.bottom - originalRect.bottom;
  }
  if (originalRect.left + transform.x < parentRect.left) {
    value.x = originalRect.left - parentRect.left;
    value.x = Math.min(value.x, -value.x); // This should always be negative
    value.w = -value.x;
  }
  if (originalRect.top + transform.y < parentRect.top) {
    value.y = originalRect.top - parentRect.top;
    value.y = Math.min(value.y, -value.y); // This should always be negative
    value.h = -value.y;
  }

  return value;
};
