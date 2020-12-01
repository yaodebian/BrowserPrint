# BrowserPrint

BrowserPrint 是一个原生的 javascript 脚本库，用于打印 HTML 页面上指定的区域。

英文文档：[english document](./README.md)

## 安装

如果没有安装 nodejs，你可以点击这里进入官方页面进行下载： [Node.js][0] 。接着，我们便可以下载相应的 npm package。

```
npm i browser-print-script
```

## 使用

**这是一个 demo:**

```
import Print from 'browser-print-script'

// get print button
const printBtn = document.querySelector('#printBtn')
// add a click listener and do print when click event is trigged
printBtn.addEventListener('click', function () {
  Print('body')
})
```

**语法糖：**

> Print(dom [, options])

**参数:**

- dom: `dom` 可以是一个 css 元素选择器，也可以是某个 HTMLElement 对象，用于指定要打印的区域。

- options: Print 的第二个参数一个配置对象，以下是该配置对象的默认配置值。

  ```
  {
    noPrint: 'no-print',
    noScroll: 'no-scroll',
    printEntity: 'print-entity',
    originalLayout: false,
    themeStyle: '',
    additionalStyle: ''
  }
  ```

  - noPrint: `String`

    这是一个 ClassName 字符串，如果你不想打印某个区域，你可以把这个 Class 设置到对应的标签上。

  - noScroll: `String`

    这是一个 ClassName 字符串，假设某个区域是带有滚动条的，你想打印它完整的内容，可以设置这个 class 到对应的标签上。

  - printEntity: `String`

    这是一个 ClassName 字符串，假如你想将某个元素的定位 position 设置为 static，可以将这个 class 设置到对应的标签上。

  - originalLayout: `Boolean`

    是否要保留原始的布局呢？因为你打印的内容可能是 `position: relative/absolute/fixed;`, 打印时我们获取不需要这样的布局，所以我们这里设置了这样的一个配置项。（默认情况下我们会将我们要打印的区域设置 `position: static;`, 即不保留原始布局）

  - themeStyle: `String`

    通过这个配置项，你可以设置打印机页的主题背景。

  - additionalStyle: `String`

    如果你想设置额外的样式用于给打印区域做一些样式上的微调，可以设置这个配置。它可以是一个 css 字符串，同时也可以是指定的某个本地 css 文件的相对路径。

  调用时通过对以上的配置进行配置可以覆盖我们默认的配置。

## License

MIT

[0]: http://nodejs.org
