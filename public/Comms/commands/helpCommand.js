$(() => {
  if(codeMode == true) return
  $('#messageInput').on('keydown', (event) => {
    if (event.keyCode == 13) {
      if (c == '/help') {
        command = true
        clientMsg(v, 'lime')
        clientServerMsg('There are currently 3 commands:<br><br>-/help  >  displays this help message<br>-/rename  >  lets you change your username<br>-/clear > clears the terminal', 'deeppink')
        $('#messageInput').val('')
        c = ''
      }
    }
  })
})