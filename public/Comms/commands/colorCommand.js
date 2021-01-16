$(() => {
  if(codeMode == true) return
  $('#messageInput').on('keydown', (event) => {
    if (event.keyCode == 13) {
      if (c.startswith('/color') || c.startsWith('/colour')) {
        renamed = true
        let m = v.split('');
        let rn;
        if (c.startswith('/color')) {
          for (let i = 0; i < 6; i++) {
            rn = v.replace(m[i], '')
            v = rn
          }
        } else {
          for (let i = 0; i < 7; i++) {
            rn = v.replace(m[i], '')
            v = rn
          }
        }
        for (let i = 0; i < 7; i++) {
          rn = v.replace(m[i], '')
          v = rn
        }

        if (rn.startsWith(' ')) {
          let rn2 = rn.replace(' ', '')
          if (!rn2.startsWith(' ')) {
            if (!rn2 == '') {
              personalColor = rn2
              socket.emit('msg', {
                m: `${uN} has changed their color to '${personalColor}'`,
                c: "yellow",
                pN: pannelNo,
                n: 'Server',
              })
              $('#messageInput').val('')
              return
            }
          }
        } else {
          load = 4
          clientServerMsg('Please input your new color.', '#ff72ff')
          c = ''
          $('#messageInput').val('')
          return
        }
      }
      if (recolor == true) {
        if (v.startsWith('/') || v.startsWith(' ')) {
          clientServerMsg('This name is not allowed', 'red')
          return
        } else {
          if (load == 4) {
            console.log('lllllllllllllllll')
            personalColor = v
            console.log(personalColor)
            clientServerMsg(`color set as '${personalColor}'`, '#ff72ff')
            $('#holder').append(`
            <div class="pannel" id="pannel-${pannelNo}">
              <p class="msg" style="color:lime;"> ${uN + ' > '} ${v} </p>
            </div>`)
            socket.emit('msg', {
              m: `${bN} has changed their color to '${personalColor}'`,
              c: "yellow",
              pN: pannelNo,
              n: 'Server',
            })
            $('#messageInput').val('')
            recolor = false
            load = 2
          }

        }
      }
    }
  })

})