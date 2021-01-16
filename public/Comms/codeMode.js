$(() => {
  let inputNo = 1
  $('#messageInputBox').on('keydown', (event) => {
    console.log(`pp1`)
    if (codeMode == true) {
      console.log(`pp2`)
      if (event.keyCode == 13) {
        console.log(`pp3`)
        if ($('#messageInput').val() == '/codemode') {
          clientMsg($('#messageInput').val(), 'lime')
          $('#uN').html(uN)
          console.log(`pp4`)
          command = true
          clientServerMsg('Code Mode has been dissabled.', 'deeppink')
          codeMode = false
          $('#messageInput').val('')
          c = ''
          return
        }
        $('#uN').html(1)
        console.log(`pp5`)
        $('#messageInputBox').append(`
        <br>
        <div class="preMsg" id='uN${inputNo}' style="float:left">${inputNo+1}</div> 
        <input type="text" class="inputy" id="messageInput${inputNo}">
        `)
        inputNo++
      }
    }
  })
  $('#messageInput').on('keydown', (event) => {
    console.log(`cm: ${codeMode}`)
    if (event.keyCode == 13) {
      if (codeMode == false) {
        if ($('#messageInput').val() == '/codemode') {
          command = true
          clientMsg($('#messageInput').val(), 'lime')
          clientServerMsg('You have entered Code Mode. All messages sent are turned into javascript code. Messages will no longer be sent to server unless Code Mode is deactivated.', 'deeppink')
          clientServerMsg('To unactivate Code Mode, use \'/codemode\'', 'deeppink')
          codeMode = true
          $('#messageInput').val('')
          c = ''
        }
        return
      }
      if (codeMode = true) {

      }
    }
  })
})