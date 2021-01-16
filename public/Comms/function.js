$(() => {
  if (codeMode == true) return
  $('#messageInput').on('keypress', (event) => {
    /* console.log(event.keyCode) */
    if (load == 2) {
      if (!ctrlToggle) {
        console.log('ungabowow')
      }
      if (event.keyCode == '77' || event.keyCode == '85') {
        if(!ctrlToggle) return
        console.log('bububaey')
        $('#online').css('display', 'block')
      }

    }
  })

  $('#messageInput').on('keydown', (event) => {
    if (event.keyCode == '17') {
      console.log('ungabunga')
      ctrlToggle = true
      return
    } else {
      console.log('pepepupu')
    }
  })

  $('#messageInput').on('keyup', (event) => {
    if (load == 2) {
      if (event.keyCode == '17') {
        console.log('bububaeyyyyy')
        ctrlToggle = false
      }
    }
  })
})