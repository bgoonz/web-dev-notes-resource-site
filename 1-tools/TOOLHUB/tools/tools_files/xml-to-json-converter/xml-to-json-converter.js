var cMeditor1, editor;

function xmlTocsv() {
  var e = cMeditor1.getValue(),
    t = "";
  if ( null != e && 0 != e.trim().length ) {
    try {
      t = $.parseXML( e )
      e = ( new X2JS ).xml2json( t );
      editor.set( e );
      }
      catch ( e ) {
        alert( "Invalid XML" )
    }

  }
}


$( document ).ready( function () {


  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    mode: "application/xml",
    lineNumbers: true,
    smartIndent: true,
    matchBrackets: true,
    autofocus: true,
    alignCDATA: true,

  } );

  var container = document.getElementById( "response" );
  var options = {
    ajv: Ajv( {
        allErrors: true,
        verbose: true
      } ),
      mode: "code",
    "indentation": 4,
    "statusBar": true,
    modes: [ 'code', 'form', 'text', 'tree', 'view' ],
      onModeChange: function () {
      setModes();
    }

  };
function setModes() {
    var m = editor.getMode();
    if ( m == 'code' ) {
      addInputIconstoEditor();
    }
    if ( m == 'text' ) {

      adjustInputIconstoEditor();
    }
  }

  editor = new JSONEditor( container, options );
  BuildEditor();

  $( '#validateJSON' ).click( function ( e ) {
    e.preventDefault();
    validateJSON();
  } )





  function BuildEditor() {
    addInputIconstoEditor();
  }
function adjustInputIconstoEditor() {
    var e = editor.menu;
    $( e ).append( '<div class="editortoolbar btn-group-sm float-right mt-1">' +
      '<div class="pointer btn-sm icon icon-check mx-1" title="JSON Validator" id="validateJSON" ></div>' +
      '<div id="inputcopy" onclick="copy_json()" title="Copy to Clipboard" class="pointer btn-sm btn-shrink icon icon-files-o icon-md mx-1"></div>' +
      '</div>' ), $( e ).show();

  }

  function addInputIconstoEditor() {
    var e = editor.menu.getElementsByClassName( "jsoneditor-poweredBy" );
    $( e ).replaceWith( '<div class="editortoolbar btn-group-sm float-right mt-1">' +
        '<div class="pointer btn-sm icon icon-check mx-1" title="JSON Validator" id="validateJSON"></div>' +
        '<div id="inputcopy" onclick="copy_json()" title="Copy to Clipboard" class="pointer btn-sm btn-shrink icon icon-files-o icon-md mx-1"></div>' +
        '</div>' ), $( e ).show(),
      editor.focus()
  }


  if ( window.FileReader ) {

    if ( $( '#filesJs' ).length > 0 ) {
      document.getElementById( 'filesJs' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object

        var ignore_fileTypes = [ 'html', 'txt', 'xml' ];

        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(), //file extension from input file
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1; //is extension not  in acceptable types
          if ( isSuccess ) {
            for ( var i = 0, f; f = files[ i ]; i++ ) {
              var reader = new FileReader();
              reader.onload = function ( event ) {
                var contents = event.target.result;
                cMeditor1.setValue( contents );
              };
              reader.readAsText( f );
            }
            record_activity( 'tool_used', t_n, 'Browse Button Clicked' )
            }
            else {
              alert( 'File Type Not Supported' );
          }
        }
        return false;
      }
    }
  } else {
    record_activity( 'tool_used', t_n, 'window.FileReader support not available' );
    alert( 'file support not available' );

  }
}, cMeditor1, editor );

function validateJSON() {
  if ( 0 == editor.getText().trim().length ) return setMessage( "error", "Input text are in Empty" ), !1;

  try {
    editor.get();
    editor.setText( "Valid JSON" );
    }
    catch ( e ) {
      editor.setMode( "text" );

  }
}
function copy_json() {
  let ClipBJS = new ClipboardJS( '#inputcopy', {
        text: function ( trigger ) {
      return editor.getText();
    },
  } );
  copyAlert( ClipBJS );
}
function loadJsData() {

  if ( typeof ajax_uri === undefined ) {
    return false;
  }

  var url = $( '#url' ).val();
  var btn = $( '#loadJsUrl' );

  var ajax_url = ajax_uri;
  if ( $.trim( url ) != '' ) {

    $.ajax( {
          url: ajax_url,
      type: "POST",
      data: {
        'link': url
      },
      beforeSend: function () {
          $( btn ).removeAttr( 'onclick' );
          $( btn ).html( '<span class="icon icon-cog icon-spin"></span> Loading ' );
          $( btn ).attr( 'disabled', true );
          $( btn ).addClass( 'btn-disabled' );
      },

      success: function ( data, textStatus, xhr ) {
          if ( $.trim( data ) != '' ) {
            var loadurl = $( '#url' ).val();
          var obj = '';
          try {
            obj = $.parseJSON( data );
            if ( "success" in obj ) {

              $( '#loadFromUrl' ).modal( "hide" );
              var e = obj.success;
              cMeditor1.setValue( e );
              record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Url ' + loadurl );
              }
              else if ( "danger" in obj ) {
                alert( 'Unable To Read Url' );
                var loadurl = $( '#url' ).val();
                record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read Url ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadJsData()' );
            $( btn ).html( 'Load From Url' );
            }
            catch ( error ) {
              record_activity( 'tool_used', t_n, 'Error : Unable to decode response of url ' + loadurl );

          }
        }
      },
      complete: function ( xhr, textStatus ) {
          if ( '' != $.trim( xhr.status ) ) {
            record_activity( 'tool_used', t_n, 'Ajax request response ' + xhr.status );
        }

      }
    } );
  }
}
