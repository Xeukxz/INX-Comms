$(() => {
  var load = 1
  /* $('#messageInput').val("> ") */
  var pannelNo = 0
  var uN = ''
  var renamed;
  var bN;
  var command;
  var c = ''
  var isTyping = false
  var users = []
  var loaded = 1
  var typing;
  var typeNo = 0
  var typeAddon;

  var peopleTyping = []


  function clientServerMsg(msg, color) {
    if (uN == undefined) uN = '';
    $('#holder').append(`
        <div class="pannel" id="pannel-${pannelNo}">
          <p class="msg" style="color:${color};"> ${'Server > '+ msg} </p>
        </div>`)
  }

  function clientMsg(msg, color) {
    if (uN == undefined) uN = '';
    $('#holder').append(`
        <div class="pannel" id="pannel-${pannelNo}">
          <p class="msg" style="color:${color};"> ${uN + ' > '} ${msg} </p>
        </div>`)
  }

  function blankClientMsg(msg, color) {
    if (uN == undefined) uN = '';
    $('#holder').append(`
        <div class="pannel" id="pannel-${pannelNo}">
          <p class="msg" style="color:${color};"> ${'> '} ${msg} </p>
        </div>`)
  }
  //------------------------------------------------
  function sendMsg() {
    socket.on('msg', function (msg) {
      if (load != '2') return
      $('#holder').append(`
        <div class="pannel" id="pannel-${msg.pN}">
          <p class="msg" style="color:${msg.c};">${msg.n + ' > '} ${msg.m}</p>
        </div>`)
    });
  }

  /*   setInterval(() => {
      for(let i=0; i<=users.length;i++){
        users[i] = 
      }
    }, 2000) */





  if (load == 1) {
    console.log(load)
    clientServerMsg('Welcome to INX-Comms, Please type your name to start.', '#ff72ff') //startup message
    socket.emit('startup', {
      id: socket.id
    })
  }

  $('#messageInput').on('keydown', (event) => {
    if (load == 2) {
      if (!typing) {
        if(!(event.keycode == 13 || event.keycode == 27))
        socket.emit('userTyping', {
          user: uN,
          id: socket.id,
          yes: 'yes'
        })
        typing = true
      }
      if (typing) {
        if (event.keyCode == 13 ) {
          socket.emit('userTyping', {
            user: uN,
            id: socket.id,
            yes: 'no'
          })
          typing = false
        }
      }
    }

    


    if (event.keyCode == 13) {
      if (load == 1) {
        uN = $('#messageInput').val()
        if (uN == '') {
          clientServerMsg('You must type a name', 'red') //must type name
          return
        } else if (uN.length > 10) {
          clientServerMsg('Name cannot be over 10 characters long', 'red')
          return
        }

        if (renamed == true) {
          $('#holder').append(`
            <div class="pannel" id="pannel-${pannelNo}">
              <p class="msg" style="color:lime;"> ${bN + ' > '} ${uN} </p>
            </div>`)

          
          socket.emit('onlineRename', {
            user: uN,
            id: socket.id,
          })
        } else {
          socket.emit('usernames', { //
            u: uN,
            id: socket.id
          })
        }




        console.log(uN)
        document.getElementById("uN").innerHTML = uN + ' >' //set the users name
        let s = $('#uN').width() + 15
        $('#messageInput').css('width', `calc(100% - ${s}px)`)
        clientServerMsg(`Username set as '${uN}'`, '#ff72ff') //confirmation message
        if (renamed == false) {
          clientServerMsg(`Type /help to view this site's functions.`, '#ff72ff') //startup info
        }
        $('#messageInput').val('')
        load = 2
        console.log(load)
        socket.emit('connection', {
          l: load
        })

        if (renamed == true) { //if user is renaming
          socket.emit('msg', {
            m: `${bN} has changed their username to '${uN}'`, //announcing username change
            c: "yellow",
            pN: pannelNo,
            n: 'Server',
          })
        } else { //else
          socket.emit('msg', {
            m: `${uN} has connected`, //announcing connection
            c: "yellow",
            pN: pannelNo,
            n: 'Server',
          })
        }


      } else if (load == 2) { //if login is finnished




        v = $('#messageInput').val()
        if (v == '') return

        if (v.startsWith('/')) { //if user types a command
          command = true
          c = v.toLowerCase()
        } else {
          c = ''
        }



        if (c.startsWith('/rename')) { //if user is trying to rename
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
                })
                $(`#${socket.id}`).html(`${uN}`)
                $('#messageInput').val('')
                s = $('#uN').width() + 15
                $('#messageInput').css('width', `calc(100% - ${s}px)`)
                return
              }
            }
          } else {
            load = 1
            clientServerMsg('Please input your new username.', '#ff72ff') //ask for new name input
          }


        } else if (c == '/help') { //help command
          command = true
          clientMsg(v, 'lime')
          clientServerMsg('There are currently 2 commands:<br><br>-/help  >  displays this help message<br>-/rename  >  lets you change your username<br>-/clear > clears the terminal', 'deeppink')
        } else if (c == '/clear') {
          command = true
          $('.pannel').remove()
          clientServerMsg('The terminal has been cleared.', '#ff72ff')
        } else {
          command = false,
            socket.emit('msg', { //sends message
              m: v,
              c: "lime",
              pN: pannelNo,
              n: uN,
            })
        }


        $('#messageInput').val('')
      }
    } else if (event.keyCode == 27) {
      $('#messageInput').val("")
      if (typing == true) {
        socket.emit('userTyping', {
          user: uN,
          id: socket.id,
          yes: 'no'
        })
      }
      typing = false
    }
  })

  socket.on('msg', function (msg) {
    if (load != '2') return
    $('#holder').append(`
        <div class="pannel" id="pannel-${msg.pN}">
          <p class="msg" style="color:${msg.c};">${msg.n + ' > '} ${msg.m}</p>
        </div>`)
  })

  socket.on('usersUpdate', function (u) {
    $(`#${u.id}`).remove()
    /* if (ping.t == true) {
      $(`#${ping.u}`).append(`
        <p id="type${ping.u}"style="color:lime;font-size: 12px;">Is Typing...</p>`)
    } */
  })

  /*   socket.on('usernames', function (u) {
      $('#online').append(`<p class="onlineU" id="${u.id}"style="color:lime;margin:0px;">${u.u}</p>`) */
  /* if (ping.t == true) {
    $(`#${ping.u}`).append(`
      <p id="type${ping.u}"style="color:lime;font-size: 12px;">Is Typing...</p>`)
  } */
  /*     loaded = 2
    }) */

  socket.on('usersLoad', function (load) {
    $('.onlineU').remove()

    for (let key in load.users) {

      let user = load.users[key]
      if (user.username != undefined) {


        $('#online').append(`<p class="onlineU" id="${user.id}"style="color:lime;margin:0px;">${user.username}</p>`)
      }

    }

  })

  socket.on('userTyping', function (type) {

    console.log(type.yes)
    if (typeNo == 0) {
      typeAddon = ''
    } else {
      typeAddon = ', '
    }
    if (type.yes == 'yes') {
      $('#typeFormatter').append(`<p class="userTyping" id="${type.id}-typing"style="color:lime;margin:0px;font-size:13px;width:fit-content;float:left;">${typeAddon + type.user}</p>`)
      typeNo++
    } else if (type.yes == 'no' && typeNo >= 0) {
      $(`#${type.id}-typing`).remove()
      typeNo--
    }
    if (typeNo > 0) {
      $('#typeBox').show()
      $('#typingBox').append(`<p class="userTyping" id="typing"style="color:lime;margin:0px;font-size:13px;width:fit-content;float:left;margin-left:5px;">is typing...</p>`)
    } else {
      $('#typeBox').hide()
      $('#typing').remove()
    }


  })

  socket.on('onlineRename', function (rename) {
    $(`#${rename.id}`).html(`${rename.user}`)
  })

  document.getElementById("innerFrame").onclick = function () {
    focusText()
  };

  function focusText() {
    document.getElementById("messageInput").focus()
  }
})

/*let i = 0;
setInterval(() => {
  $('#innerFrame').css('transform', `rotate(${i}deg)`);
  i++
}, 10);
*/