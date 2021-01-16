$(() => {
  if(codeMode == true) return
  $('#messageInput').on('keydown', (event) => {
    /* console.log(event.keyCode) */
    if (load == 2) {
      if (!typing) {
        if (!(event.keyCode == 13 || event.keyCode == 27))
          socket.emit('userTyping', {
            user: uN,
            id: socket.id,
            yes: 'yes'
          })
        typing = true
      } else if ((typing && event.keyCode == 13) || (typing && event.keyCode == 27)) {
        socket.emit('userTyping', {
          user: uN,
          id: socket.id,
          yes: 'no'
        })
        typing = false
      } else if ($('#messageInput').val() == '') {
        socket.emit('userTyping', {
          user: uN,
          id: socket.id,
          yes: 'no'
        })
      }
    }
  })
})