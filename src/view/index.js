const printBtn = document.querySelector('#printBtn')
printBtn.addEventListener('click', function () {
  window.Print('body', {
    themeStyle: 'url(src/assets/img/demo.jpg) top center/cover repeat-y',
    additionalStyle: 'src/assets/css/test.css'
  })
})
