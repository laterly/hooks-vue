<h1><b>hooks-vue3</b></h1>
  <sup>
    <a href="https://www.npmjs.com/package/hooks-vue3">
       <img src="https://img.shields.io/npm/v/hooks-vue3.svg" alt="npm package" />
    </a>
  </sup>
<h4>Vue3 常用的Hooks</h4>


## 📦 Install

by using `npm`:

```bash
npm install hooks-vue3 --save
```

by using `yarn`:

```bash
yarn add hooks-vue3
```

by using `pnpm`:


```bash
pnpm install hooks-vue3 --save
```

## 📚 Online Docs
<h4>
  <a href="https://laterly.gitbook.io/hooks-vue3/">使用文档</a>
</h4>

## 🔨 Usage

- **React Style**
  - [`useState`](https://laterly.gitbook.io/hooks-vue3/usestate) — useState 管理状态值.

- **Async**
  - [`useAsyncState`](https://laterly.gitbook.io/hooks-vue3/useasyncstate) — useAsyncState 管理异步状态值.
- **Watch**
  - [`useDebounceWatch`](https://laterly.gitbook.io/hooks-vue3/usedebouncewatch) - useDebounceWatch 跟watch类似，可以控制函数在多次触发的防抖。
  - [`useThrottleWatch`](https://laterly.gitbook.io/hooks-vue3/usethrottlewatch) - useThrottleWatch 跟watch类似，可以控制函数在多次触发的节流。
   - [`useOnceWatch`](https://laterly.gitbook.io/hooks-vue3/useoncewatch) - useOnceWatch 跟watch类似，只触发一次监听，然后自动停止监听
- **Side**
  - [`useTimeout`](https://laterly.gitbook.io/hooks-vue3/usetimeout) — useTimeout 在指定的时间后执行一个函数
  - [`useInterval`](https://laterly.gitbook.io/hooks-vue3/useinterval) — useInterval 定时器执行一个函数
- **State**
  - [`useBoolean`](https://laterly.gitbook.io/hooks-vue3/useboolean) — useBoolean 管理一个布尔类型的状态值.
  - [`useToggle`](https://laterly.gitbook.io/hooks-vue3/usetoggle) — useToggle 可用于管理布尔值状态，还可以用于管理任何类型的状态的真假值
  - [`useDebounce`](https://laterly.gitbook.io/hooks-vue3/usedebounce) — useDebounce 用于处理防抖值
  - [`useThrottle`](https://laterly.gitbook.io/hooks-vue3/usethrottle) — useThrottle 用于处理节流值
  - [`useLocalStorage`](https://laterly.gitbook.io/hooks-vue3/uselocalstorage) — useLocalStorage 将状态持久化到 localStorage 本地存储中
  - [`useSessionStorage`](https://laterly.gitbook.io/hooks-vue3/usesessionstorage) — useSessionStorage 将状态持久化到 sessionStorage 本地存储中
  
- **Elements**
   - [`useClickOutside`](https://laterly.gitbook.io/hooks-vue3/useclickoutside) — useClickOutside 监听点击目标元素外部时执行某个回调函数，点击事件也可以自定义，可以是其它的鼠标事件
   - [`useElementSize`](https://laterly.gitbook.io/hooks-vue3/useelementsize) - useElementSize 可以用于获取DOM元素的尺寸信息
   - [`useTitle`](https://laterly.gitbook.io/hooks-vue3/usetitle) - 
   - [`useLongPress`](https://laterly.gitbook.io/hooks-vue3/uselongpress) &mdash; useLongPress 用于在长按某个元素时触发回调函数
   - [`useDocumentVisibility`](https://laterly.gitbook.io/hooks-vue3/usedocumentvisibility) &mdash; useDocumentVisibility 检测当前页面是否处于活动状态（即当前窗口的可见性）
   - [`useEventListener`](https://laterly.gitbook.io/hooks-vue3/useeventlistener) &mdash; useEventListener 用于封装原生的 addEventListener 方法，使得在函数式组件中添加事件监听器更加方便
   - [`useHover`](https://laterly.gitbook.io/hooks-vue3/usehover) &mdash; useHover 鼠标是否正在悬停目标元素上