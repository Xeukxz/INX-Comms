socket.on('msg', function (msg) {
  if (load != '2') return
  $('#holder').append(`
      <div class="pannel" id="pannel-${msg.pN}">
        <span class="msg" style="color:${msg.c};">${msg.n + ' > '} ${msg.m}</span>
      </div>`)
    
  messageInfo(messageInfoVar[1]+"ID-"+msg.id+"/Public", msg.c)
})

socket.on('usersUpdate', function (u) {
  $(`#${u.id}`).remove()
  /* if (ping.t == true) {
    $(`#${ping.u}`).append(`
      <p id="type${ping.u}"style="color:lime;font-size: 12px;">Is Typing...</p>`)
  } */
})

/*   socket.on('usernames', function (u) {
    $('#online').append(`<span class="onlineU" id="${u.id}"style="color:lime;margin:0px;">${u.u}</span>`) */
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

  console.log(typing)
  console.log(type.yes)

  if (typeNo == 0) {
    typeAddon = ''
  } else {
    typeAddon = ', '
  }

  if (type.yes == 'yes') {
    $('#typeFormatter').append(`<span class="userTyping" id="${type.id}-typing"style="color:lime;margin-left:5px;;width:fit-content;float:left;">${typeAddon + type.user}</span>`)
    console.log('t2 '+typeNo)
    typeNo++
    console.log('t22 '+typeNo)

  } else if (type.yes == 'no' && typeNo > 0) {
    console.log('t1 '+typeNo)
    $(`#${type.id}-typing`).remove()
    typeNo--
    console.log('t12 '+typeNo)
  }
  if (typeNo > 0) {
    $('#typeBox').show()
    $('#typingBox').append(`<span class="userTyping" id="typing"style="color:lime;margin-left:5px;;width:fit-content;float:left;">is typing...</span>`)
  } else if (typeNo < 0) {
    console.log('t3 '+typeNo)
    typeNo = 0
  } else {
    $('#typeBox').hide()
    $('#typing').remove()
  }


})