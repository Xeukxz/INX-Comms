$(() => {
  if(codeMode == true) return

  $('#messageInput').on('keydown', (event) => {
    if (c == '/clear') {
      command = true
      $('.pannel').remove()
      clientServerMsg('The terminal has been cleared.', '#ff72ff')
      $('#messageInput').val('')
      c = ''
    }
  })
})