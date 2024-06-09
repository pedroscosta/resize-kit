<div align="center">

# resize-kit
A React Hook that makes any component resizable. Extremely flexible and unopinionated.

<img alt="NPM Version" src="https://img.shields.io/npm/v/resize-kit">
</div>
<br>


- Headless: no default styling, doesn't create a new DOM element.
- Unopinionated: doesn't add handles, borders or even handles state, it's all up to your taste.
- Flexible: allows you to completely customize the resizing behavior.

## Getting started

Install the dependency:

```shell
pnpm add resize-kit
```

Add the hook to your component:

```tsx
const Component = () => {
  const { createHandleListeners, transform } = useResizable({});

  return (
    <div style={{ width: 200 + (transform?.w ?? 0), height: 100 + (transform?.h ?? 0) }}>
      Resizable div
      <button style={{ position: absolute, right: 0, bottom: 0 }} {...createHandleListeners('se')} />
    </div>
  )
}
```

## Resizing handles

Since the idea of this library is to be headless, it doesn't create the handles automatically. Creating a handle is as simple as passing the listeners to any kind of Component and specifying the direction it represents.

```tsx
const Component = () => {
  const { createHandleListeners, transform } = useResizable({});

  return (
    <div style={{ width: 200 + (transform?.w ?? 0), height: 100 + (transform?.h ?? 0) }}>
      Resizable div
      <button style={{ position: absolute, right: 0, bottom: 0 }} {...createHandleListeners('se')} />
      <button style={{ position: absolute, right: 0, top: '50%' }} {...createHandleListeners('e')} />
    </div>
  )
}
```

The possible directions are:

```tsx
type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
```

Meaning that 's' is resizing from bottom, 'e' from the right and 'se' from the bottom-right.

> Handles with pure directions (n, s, e, w) allow resizing only on their axis (x or y)!


## Resizing events

There are three resizing events that can be handled:

```tsx
const Component = () => {
  const { createHandleListeners, transform } = useResizable({
    onResizeStart: (data) => {/* ... */},
    onResize: (data) => {/* ... */},
    onResizeEnd: (data) => {/* ... */}
  });

 // ...
}
```

Here are the types for each event handler:

#### onResizeStart:

```tsx
type onResizeStart = (data: {
  event: React.PointerEvent;
  handle?: ResizeDirection;
}) => void;
```

#### onResize:

```tsx
type onResize = (data: {
  transform: Transform;
  delta: Delta;
  event: PointerEvent;
  handle?: ResizeDirection;
}) => void;
```

#### onResizeEnd:

```tsx
type onResizeEnd = (data: {
  transform: Transform;
  delta: Delta;
  event: PointerEvent;
  handle?: ResizeDirection;
}) => void;
```

## Modifiers

In order to modify the original resizing behavior, passing a modifier is required. Here are the included modifiers:

#### boundToParentElement:

Restricts the resizing to the bounds of the parent element of the element that contains the handles.

```tsx
const Component = () => {
  const { createHandleListeners, transform } = useResizable({
    modifiers: [boundToParentElement]
  });

  <div style={{ border: '1px solid black', width: 500, height: 500 }}> {/* <<< Will restrict to the bounds of this element. */}
    <div style={{ width: 200 + (transform?.w ?? 0), height: 100 + (transform?.h ?? 0) }}>
      <button style={{ position: absolute, right: 0, bottom: 0 }} {...createHandleListeners('se')} />
    </div>
  </div>
}
```

#### createSnapModifier:

Creates a snap modifier, allows different snap distances on each axis.

```tsx
const Component = () => {
  const { createHandleListeners, transform } = useResizable({
    modifiers: [createSnapModifier([10, 20])] // Will snap each 10px on x and w, 20px on y and h.
  });

  <div style={{ width: 200 + (transform?.w ?? 0), height: 100 + (transform?.h ?? 0) }}>
    <button style={{ position: absolute, right: 0, bottom: 0 }} {...createHandleListeners('se')} />
  </div>
}
```

### Creating a custom modifier:

Creating a modifier is as simple as creating a function that returns a new Transform:

```tsx
const customSnapModifier: Modifier = ({ transform }) => {
  // Will snap only the width transformation.
  return {
    ...transform,
    w: Math.round(transform.w / 10) * 10,
  };
}
```

<br>

---

<br>
<div align="center">
<b>Created by <a href="https://x.com/pedroscosta_">@pedroscosta_</a> with ❤️</b>
</div>
