const Print = function (dom, options) {
  if (!(this instanceof Print)) return new Print(dom, options) // If you call this function directly, here will operate 'new' operator to create a print instace.

  // init print config.
  this.options = this.extend({
    noPrint: 'no-print', // This is a className. You can set it on any tag which you don't want to print it.
    noScroll: 'no-scroll', // This is a className. You can set it on any tag which you want to print complete content of it.
    printEntity: 'print-entity', // This is a className. You can set it on any tag which you want to change its postion to static.
    originalLayout: false, // Whether you want to keep original layout.
    themeStyle: '', // Here you can set background css value.
    additionalStyle: '' // additional style you want to add. It can be normal css string or a relative url of a css file.
  }, options)

  // Init the dom which you want to print.
  if (!dom) {
    throw new Error('param "dom" is required')
  } else if ((typeof dom) === 'string') {
    this.dom = document.querySelector(dom)
  } else {
    this.dom = this.isDOM(dom) ? dom : dom.$el
  }

  // Whether to keep original layout.
  if (!this.options.originalLayout && this.options.printEntity && this.dom.className.indexOf(this.options.printEntity) === -1) {
    this.dom.className += `${this.dom.className ? ' ' : ''}${this.options.printEntity}`
  }

  // Print the target block on page.
  this.init()
}

// Add some prototypes.
Print.prototype = {
  // entry of printing
  init: function () {
    this.getStyle().then(style => {
      const content = `
        ${style}
        <div class="body-wrapper"></div>
        ${this.getHtml()}
      `
      this.writeIframe(content)
    })
  },
  // get final config obj
  extend: function (obj, obj2) {
    for (const k in obj2) {
      obj[k] = obj2[k]
    }
    return obj
  },
  // inherit css on page and add some additional css
  getStyle: async function () {
    let str = ''
    const styles = document.querySelectorAll('style,link')
    for (let i = 0; i < styles.length; i++) {
      str += styles[i].outerHTML
    }

    /* get additionalStyle: start point */
    let additionalStyle = this.options.additionalStyle // if opt additionalStyle is just a css string, do nothing and add it into our final style string.
    // Here I try to filter out some unmatched path.
    if (/.*\.css$/.test(additionalStyle) && !/^(([\w\d][\w\d-_]*\/)|(\.{1,2}\/))*([\w\d][\w\d-_]*\.[a-z]+)$/i.test(additionalStyle)) {
      throw new Error(`This is not a standard relative path: "${additionalStyle}". Please set a relative path which only contains [a-zA-Z0-9-_].`)
    }
    try {
      if (/.*\.css$/.test(additionalStyle)) { // if opt additionalStyle is a relative path of a css file
        additionalStyle = await fetch(additionalStyle).then(response => response.text())
      }
    } catch (err) {
      throw new Error(err)
    }
    /* get additionalStyle: end point */

    str += `
    <style>
      /* add class style which 'options.noPrint' set */
      ${this.options.noPrint ? `.${this.options.noPrint}` : '.no-print'} {
        display:none;
      }
      /* add class style which 'options.noScroll' set */
      ${this.options.noScroll ? `.${this.options.noScroll}` : '.no-scroll'} {
        width: auto !important;
        height: auto !important;
      }
      /* add class style which 'options.noScroll' set */
      ${this.options.printEntity ? `.${this.options.printEntity}` : '.print-entity'} {
        position: static !important;
      }
      /* set page theme */
      .body-wrapper {
        width: 100%;
        height: 100%;
        background: ${this.options.themeStyle};
        position: fixed;
        left: 0;
        top: 0;
        z-index: -9999;
      }
      /* here is what you set in additionalStyle property */
      ${additionalStyle}
    </style>
    `

    return str
  },
  // get final html
  getHtml: function () {
    return this.dom.outerHTML
  },
  // write html to frame
  writeIframe: function (content) {
    // create an iframe element, set some attributes, insert iframe element into body
    const iframe = document.createElement('iframe')
    iframe.id = 'myIframe'
    iframe.style.border = '0 none'
    iframe.setAttribute('frameBorder', 0)
    iframe.setAttribute('style', 'width:0;height:0;position:absolute;')
    document.body.appendChild(iframe)
    // get window's iframe object and document object
    const w = iframe.contentWindow || iframe.contentDocument
    const doc = iframe.contentDocument || iframe.contentWindow.document
    // insert the target block's html into frame's body.
    doc.open()
    doc.write(content)
    doc.close()
    // When the iframe element is loaded, print the frame block. Remove the iframe element when the print dialog show.
    const _this = this
    iframe.onload = function () {
      _this.print(w, doc)
      setTimeout(function () {
        document.body.removeChild(iframe)
      })
    }
  },
  // print frame
  print: function (frameWindow, frameDoc) {
    frameWindow.focus()
    frameWindow.print()
    frameWindow.close()
  },
  // determine whether the target dom is a dom.
  isDOM: function (o) {
    return (
      typeof HTMLElement === 'object'
        ? o instanceof HTMLElement // DOM2
        : o && typeof o === 'object' && o.nodeType === 1 && typeof o.nodeName === 'string'
    )
  }
}

export default Print
