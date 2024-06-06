<div style="display: flex; flex-direction:column; align-items:center;">
<h1 style="text-align: center; width: 100%">resize-kit</h1>
<p>A React Hook that makes any component resizable. Extremely flexible and unopinionated.</p>
<img alt="NPM Version" src="https://img.shields.io/npm/v/resize-kit">
<div>
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

```typescript
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

<br>

---

<br>
<div style="text-align: center; width: 100%"><b>Created by <a href="https://x.com/pedroscosta_">@pedroscosta_</a> with ❤️</b></div>
