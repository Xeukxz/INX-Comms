$(() => {
  if(codeMode == true) return
  $('#messageInput').on('keydown', (event) => {
    v = $('#messageInput').val()

    if (v.startsWith('/')) {
      c = v

    } else {

      if (event.keyCode == 13) {

        if (load == 2) { //if login is finnished

          if (v == '') return

          socket.emit('msg', { //sends message
            m: v,
            c: personalColor,
            pN: pannelNo,
            n: uN,
            id: socket.id,
          })
          messageNumber++

          $('#messageInput').val('')
        }
      }
      if (event.keyCode == 27) {
        $('#messageInput').val('')
      }
    }
  })
})