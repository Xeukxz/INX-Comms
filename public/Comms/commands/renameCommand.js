$(() => {
  if(codeMode == true) return
  $('#messageInput').on('keydown', (event) => {
    if (event.keyCode == 13) {
      if (c.startsWith('/rename')) { //if user is trying to rename
        console.log('Command Identified')
        clientMsg(v, 'lime')
        command = true
        bN = uN
        document.getElementById("uN").innerHTML = ' >'
        renamed = true


        let m = v.split('');
        let rn;
        for (let i = 0; i < 7; i++) {
          rn = v.replace(m[i], '')
          v = rn
        }
        if (rn.startsWith(' ')) {
          let rn2 = rn.replace(' ', '')
          if (!rn2.startsWith(' ')) {
            if (!rn2 == '') {
              uN = rn2
              document.getElementById("uN").innerHTML = uN + ' >'
              socket.emit('msg', {
                m: `${bN} has changed their username to '${uN}'`,
                c: "yellow",
                pN: pannelNo,
                n: 'Server',
                id: socket.id,
              })
              $(`#${socket.id}`).html(`${uN}`)
              $('#messageInput').val('')
              s = $('#uN').width() + 15
              $('#messageInput').css('width', `calc(100% - ${s}px)`)
              renamed = false
              return
            }
          }
          
        } else {
          load = 3
          clientServerMsg('Please input your new username.', '#ff72ff') //ask for new name input
          c = ''
          $('#messageInput').val('')
          return
        }
      }
      if (renamed == true) {
        if (v.startsWith('/') || v.startsWith(' ') || v.length == 0) {
          clientServerMsg('This name is not allowed', 'red')
          return
        } else {
          if (load == 3) {
            console.log('lllllllllllllllll')
            uN = v
            console.log(uN)
            document.getElementById("uN").innerHTML = uN + ' >'
            let s = $('#uN').width() + 15
            $('#messageInput').css('width', `calc(100% - ${s}px)`)
            clientServerMsg(`Username set as '${uN}'`, '#ff72ff')
            $('#holder').append(`
            <div class="pannel" id="pannel-${pannelNo}">
              <p class="msg" style="color:lime;"> ${bN + ' > '} ${uN} </p>
            </div>`)
            messageInfo(messageInfoVar[1]+"ID-"+socket.id, 'lime')
            socket.emit('msg', {
              m: `${bN} has changed their username to '${uN}'`, //announcing username change
              c: "yellow",
              pN: pannelNo,
              n: 'Server',
              id: socket.id,
            })
            $('#messageInput').val('')
            renamed = false
            load = 2
            return
          }

        }
      }
    }
  })

})