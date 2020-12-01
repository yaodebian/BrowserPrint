# BrowserPrint

A native javascript script for printing target dom block.

chinese doc: [中文文档](./README.zh.md)

## Installation

First, install [Node.js][0]. Then:

```
npm i browser-print-script
```

## Usage

**demo:**

```
import Print from 'browser-print-script'

// get print button
const printBtn = document.querySelector('#printBtn')
// add a click listener and do print when click event is trigged
printBtn.addEventListener('click', function () {
  Print('body')
})
```

**syntax：**

> Print(dom [, options])

**parameters:**

- dom: `dom` can be a css selector or a HTMLElement Object. It's the area we want to print.

- options: This is an Object whose default config likes this:

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

    This is a className. You can set it on any tag which you don't want to print it.

  - noScroll: `String`

    This is a className. You can set it on any tag which you want to print complete content of it.

  - printEntity: `String`

    This is a className. You can set it on any tag which you want to change its postion to static.

  - originalLayout: `Boolean`

    Whether you want to keep original layout.

  - themeStyle: `String`

    Here you can set background css value.

  - additionalStyle: `String`

    Additional style you want to add. It can be normal css string or a relative url of a css file.

  You can set attributes above to cover default value.

## License

MIT

[0]: http://nodejs.org
