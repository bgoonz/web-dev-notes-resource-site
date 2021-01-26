var cMeditor1, textCopySuccess, editor;
async function sqlTOjson() {
  var e = cMeditor1.getValue();
  try {
    if ( null != e && 0 != e.trim().length ) {
      if ( -1 == e.toLowerCase().search( "create" ) ) throw ( "Missing CREATE STATEMENT, USE SAMPLE DATA FOR AN IDEA" );
      if ( -1 == e.toLowerCase().search( "select" ) ) throw ( "Missing SELECT STATEMENT, USE SAMPLE DATA FOR AN IDEA" );
      const SQL = await initSqlJs( {
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.2.2/dist/${file}`
      } );
      var t = ( new SQL.Database ).exec( e ),
        s = "[";
      $.each( t, function ( e, a ) {
        $.each( a.values, function ( e, r ) {
          var o = "{";
          $.each( r, function ( e, t ) {
            o += '"' + a.columns[ e ] + '"  :"' + t + '"', r.length != e + 1 && ( o += "," )
          } ), o += "}", a.values.length != e + 1 && ( o += "," ), s += o
        } ), t.length != e + 1 && ( s += "," )
      } ), s += "]";
      editor.setText( s );
    }
  } catch ( e ) {
    editor.setMode( "text" );
    editor.setText( e )
  }
}
$( document ).ready( function () {
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    matchBrackets: true,
    autoCloseBrackets: true,
    mode: "text/x-sql",
    lineWrapping: true,
    lineNumbers: true,
  } );
  CodeMirror.commands[ "selectAll" ]( cMeditor1 );
  var container = document.getElementById( "result" );
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
      '<a href="#" id="sampleDataBtn" title="Sample JSON Data" class="poweredBy" class="samplelink mx-1" onclick="getJsonSampleData();">Sample</a>' +
      '<div class="pointer btn-sm icon icon-check mx-1" title="JSON Validator" id="validateJSON" ></div>' +
      '<div class="pointer btn-sm icon icon-times mx-1" title="Clear" onclick="cleanJSONEditor(\'editor\')"></div>' +
      '<div id="inputcopy" onclick="copy_json()" title="Copy to Clipboard" class="pointer btn-sm btn-shrink icon icon-files-o mx-1 icon-md"></div>' +
      '</div>' ), $( e ).show();
  }

  function addInputIconstoEditor() {
    var e = editor.menu.getElementsByClassName( "jsoneditor-poweredBy" );
    $( e ).replaceWith( '<div class="editortoolbar btn-group-sm float-right mt-1">' +
      '<a href="#" id="sampleDataBtn" title="Sample JSON Data" class="poweredBy" class="samplelink mx-1" onclick="getJsonSampleData();">Sample</a>' +
      '<div class="pointer btn-sm icon icon-check mx-1" title="JSON Validator" id="validateJSON" ></div>' +
      '<div class="pointer btn-sm icon icon-times mx-1" title="Clear" onclick="cleanJSONEditor(\'editor\')"></div>' +
      '<div id="inputcopy" onclick="copy_json()" title="Copy to Clipboard" class="pointer btn-sm btn-shrink icon icon-files-o icon-md"></div>' +
      '</div>' ), $( e ).show(), editor.focus()
  }
  if ( window.FileReader ) {
    if ( $( '#filesJs' ).length > 0 ) {
      document.getElementById( 'filesJs' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files;
        var ignore_fileTypes = [ 'csv' ];
        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(),
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1;
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
          } else {
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
}, cMeditor1, textCopySuccess, editor );

function cleanJSONEditor() {
  editor.setText( "" );
}

function validateJSON() {
  if ( 0 == editor.getText().trim().length );
  try {
    editor.get();
    editor.setText( "Valid JSON" );
  } catch ( e ) {
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
            } else if ( "danger" in obj ) {
              alert( 'Unable To Read Url' );
              var loadurl = $( '#url' ).val();
              record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read Url ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadJsData()' );
            $( btn ).html( 'Load From Url' );
          } catch ( error ) {
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
