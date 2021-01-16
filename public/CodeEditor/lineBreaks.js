$(() => {

  $('.editorLine').on('keypress', (event) => {
    if (event.keyCode == '13') {

      return false;
    }
  })



  $('.editorLine').on('keydown', (event) => {

    console.log($(this).text())

    /* if($(this).attr('class') != 'lineData') return */
    /* if (event.keyCode != 13) return
    console.log(lineNumber)
    console.log($(this)) 
    $('#holder').append(`
      <br>
      <span class="editorLine" id="line${lineNumber}">
        <span class='lineNo'>${lineNumber}</span>
        <span class="lineData" id='line1val' contentEditable="true">${(lineNumber.toString())*lineNumber}</span>
      </span>
    `)
    lineNumber++

    let currentLine = $(this).attr('id').split('')

    function deCodeLine(line) {
      let lineLength = line.length
      let strippedLineLength = lineLength - 7

      console.log(currentLine)
      console.log(lineLength)
      console.log(strippedLineLength)

      for (let i = 0; i >= lineLength; i++) {
        let v = currentLine.join('')
        v = v.replace(currentLine[3], '')
        let b
        for (let o = 0; o = strippedLineLength; o++) {
          b += v[o]
        }

      }
    }



    return event.which != 13; */
  })
})




/* 
╚╬╝
╔╩╦
╠╬
╚═ 
*/