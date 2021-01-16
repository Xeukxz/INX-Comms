console.log('Startup Initiated')

var pannelNo = 0
var vc = ''
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
var load = 1
var renamed = false
var personalColor = 'lime'
let messageInfoVar = window.location.href.split("//")
let messageNumber = 0
let ctrlToggle = false

function messageInfo(msg, color) {
  $('#holder2').append(`
  <span class="pannel" id="info-${pannelNo}"> 
  <span class="msg" style="color:${color};margin-left:5px">${msg}</span>
  </span>`)
  adjustFrames()
}

function adjustFrames() {
  $('#holder2').css('height', `${$('#holder2').height()+17}px`)
  if($('#holder2').height() > $('#innerFrame').height()) {
    $('#innerFrame').css('height', `${$('#holder2').height()}px`)
    $('#innerFrame2').css('height', `${$('#holder2').height()}px`)
  }
}

function clientServerMsg(msg, color) {
  if (uN == undefined) uN = '';
  $('#holder').append(`
      <div class="pannel" id="pannel-${pannelNo}">
        <span class="msg" style="color:${color};"> ${'Server > '+ msg} </span>
      </div>`)
  messageInfo(messageInfoVar[1]+"Server/Client", color)
}

function clientMsg(msg, color) {
  if (uN == undefined) uN = '';
  $('#holder').append(`
      <div class="pannel" id="pannel-${pannelNo}">
        <span class="msg" style="color:${color};"> ${uN + ' > '} ${msg} </span>
      </div>`)
  messageInfo(messageInfoVar[1]+"ID-"+socket.id+"/Client", color)
}


$(() => {


  if (load == 1) {
    console.log(load)
    clientServerMsg('Welcome to INX-Comms, Please type your name to start.', '#ff72ff')
    socket.emit('startup', {
      id: socket.id
    })
  }

  $('#messageInput').on('keydown', (event) => {

    if (event.keyCode == 13) {
      console.log('1')

      if (load == 1) { //////////////////////
        console.log('2')
        uN = $('#messageInput').val()

        if (uN == '') {
          console.log('3')
          clientServerMsg('You must type a name', 'red') //must type name
          return

        } else if (uN.length > 20) {
          console.log('4')
          clientServerMsg('Name cannot be over 20 characters long', 'red')
          return

        }
        console.log('5')
        /* if (renamed == true) {

          $('#holder').append(`
                  <div class="pannel" id="pannel-${pannelNo}">
                    <p class="msg" style="color:lime;"> ${bN + ' > '} ${uN} </p>
                  </div>`)

        } else {

          socket.emit('usernames', { //
            u: uN,
            id: socket.id
          })

        } */

        console.log(uN)
        document.getElementById("uN").innerHTML = uN + ' >' //set the users name

        let s = $('#uN').width() + 15
        $('#messageInput').css('width', `calc(100% - ${s}px)`)

        clientServerMsg(`Username set as '${uN}'`, '#ff72ff') //confirmation message

        if (renamed == false) {

          clientServerMsg(`Type /help to view commands.`, '#ff72ff') //startup info

        }

        $('#messageInput').val('')

        load = 2
        console.log(load)

        //else
        socket.emit('msg', {
          m: `${uN} has connected`, //announcing connection
          c: "yellow",
          pN: pannelNo,
          n: 'Server',
          id: socket.id,
        })
      } else {
        console.log(`$('#outerFrame').css('height', ${$('body').height()}px)`)
        $('#outerFrame').css('height', `${$('body').height()+17}px`)
        $('#outerFrame2').css('height', `${$('body').height()+17}px`)
      }
    }
  })
  document.getElementById("innerFrame").onclick = function () {
    if (codeMode == true) return
    focusText()
  };
  document.getElementById("innerFrame2").onclick = function () {
    if (codeMode == true) return
    focusText()
  };

  function focusText() {
    document.getElementById("messageInput").focus()
  }
})