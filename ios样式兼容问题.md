## 方法二：只禁止“顶部下拉”
方法三：CSS 方式（推荐，简单粗暴）
在 html, body 上加上：
html, body {
  height: 100%;
  overflow: hidden;   /* 禁止滚动 */
}
如果你有某个容器需要滚动，可以单独设置：
.scrollable {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* 保持 iOS 惯性滚动 */
}




好问题 👍

在 iPhone X 及以后有「刘海屏 / 底部 Home Indicator」的设备上，Safari 提供了 **安全区域变量**，可以用来在 CSS 里实现安全距离。

---

## ✅ CSS 实现方式

### 1. 启用安全区域适配

在 `<head>` 里加上 viewport 配置：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

> `viewport-fit=cover` 允许内容延伸到全面屏区域（刘海、底部条），然后再由 CSS 的 `env()` / `constant()` 变量来加安全距离。

---

### 2. 使用安全区域变量

Safari 提供了四个 **环境变量**：

* `env(safe-area-inset-top)`：顶部刘海高度
* `env(safe-area-inset-right)`：右边安全距离
* `env(safe-area-inset-bottom)`：底部 Home Indicator 高度
* `env(safe-area-inset-left)`：左边安全距离

旧版 iOS 使用 `constant()`，为了兼容最好两个都写：

```css
.safe-area {
  padding-top: constant(safe-area-inset-top); /* iOS < 11.2 */
  padding-top: env(safe-area-inset-top);      /* iOS >= 11.2 */

  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  padding-left: constant(safe-area-inset-left);
  padding-left: env(safe-area-inset-left);

  padding-right: constant(safe-area-inset-right);
  padding-right: env(safe-area-inset-right);
}
```

---

### 3. 实际应用场景

* **顶部导航栏**

```css
.header {
  height: 44px; /* 状态栏下方导航高度 */
  padding-top: env(safe-area-inset-top);
  background: #fff;
}
```

* **底部固定按钮**

```css
.footer-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: env(safe-area-inset-bottom);
  background: #fff;
}
```

---

## ✅ 总结

1. `meta viewport` 必须加 `viewport-fit=cover`
2. 用 `env(safe-area-inset-*)` 设置 **padding / margin**
3. 兼容旧 iOS（< 11.2）时，写上 `constant()`

---

要不要我帮你写一个 **通用 CSS 工具类**（比如 `.pt-safe`, `.pb-safe`，直接加 class 就能适配刘海屏安全距离）？



👌 好的，我帮你写一套 **通用安全区工具类**，直接引入后在 H5 / WebApp 中就能适配 iOS 刘海屏和底部安全区。

---

## ✅ CSS 工具类写法

```css
/* 启用 viewport 安全区域支持 */
@supports (padding: env(safe-area-inset-top)) {
  .pt-safe {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
  .pb-safe {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .pl-safe {
    padding-left: constant(safe-area-inset-left);
    padding-left: env(safe-area-inset-left);
  }
  .pr-safe {
    padding-right: constant(safe-area-inset-right);
    padding-right: env(safe-area-inset-right);
  }

  .mt-safe {
    margin-top: constant(safe-area-inset-top);
    margin-top: env(safe-area-inset-top);
  }
  .mb-safe {
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
  .ml-safe {
    margin-left: constant(safe-area-inset-left);
    margin-left: env(safe-area-inset-left);
  }
  .mr-safe {
    margin-right: constant(safe-area-inset-right);
    margin-right: env(safe-area-inset-right);
  }
}
```

---

## ✅ 使用示例

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

<div class="header pt-safe">
  顶部导航栏（自动避开刘海）
</div>

<div class="content">
  页面内容
</div>

<div class="footer pb-safe">
  底部按钮（自动避开 Home Indicator）
</div>
```

---

## ✅ 效果

* `.pt-safe` → 自动给顶部导航栏加上刘海高度的 `padding-top`
* `.pb-safe` → 自动给底部栏加上 Home Indicator 高度的 `padding-bottom`
* 其它 `.pl-safe`、`.pr-safe`、`.mt-safe`、`.mb-safe` 同理

---

要不要我帮你再写一个 **Tailwind 插件版**（直接 `pt-safe`、`pb-safe` 当作 Tailwind 的类名用）？
