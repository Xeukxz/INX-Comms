var lineNumber = 2

$(() => {return

  console.log('1')
  $('.lineData').attr('contentEditable', 'true')//find doc of all html element attributes.
  /* $('.lineData').on('click', (event) =>{
    console.log($(this).attr('id'))
    $(this).attr('contentEditable', 'true')
    $(this).focus()
  }) */
  /* $('.editorLine').click(function () {
    console.log('test')
    let val = `#${$(this).attr('id')+'val'}`

    console.log(val)
    $(val).attr('contentEditable', 'true')
  })

    /* $('#header').click(function () {
      if (typeof attr !== ('undefined')) {
        console.log('kanker')
      }
    }) */


  /* $('.editorLine').on('blur', function () {
    console.log('test')
    console.log($(this))
    $(this).attr('contentEditable', 'false')
  }) */

  console.log('2')

})