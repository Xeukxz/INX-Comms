console.log('First file called successfully')

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
var codeMode = false

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