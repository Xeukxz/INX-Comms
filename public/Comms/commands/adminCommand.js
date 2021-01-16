$(() => {
  let n = 0
  $('#messageInput').on('keydown', (event) => {
    if (event.keyCode == '17') n++
    else n = 0

    console.log(n)

    if(n >=5 && $('#messageInput').val() == 'xeukxz') {
      console.log('babayaga')
      $('#messageInputBox').append(`<span id="message-embed" contenteditable="true" style="background-color: rgb(15, 15, 15)"></span>`)
    }
    
      if (event.keyCode == "78") {
        setTimeout(function () {
          console.log('sleeping')
          if ($('#messageInput').val() == "admin") {
            console.log("adminised")
            $('#messageInput').val("")
            $('#messageInput').prop("type", "password");
            
          } else {
            console.log('bababoey')
          }
        }, 10)
      }

      
    /* if (c == '') {
      command = true
      $('.pannel').remove()
      clientServerMsg('The terminal has been cleared.', '#ff72ff')
      $('#messageInput').val('')
      c = ''
    } */
  })
})