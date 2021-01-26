editor = null;
$( document ).ready( function () {
  var container = document.getElementById( "jsoneditor" );
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
    },
  };
  editor = new JSONEditor( container, options );
  BuildEditor();

  function setModes() {
    var m = editor.getMode();
    if ( m == 'code' ) {
      addInputIconstoEditor();
    }
    if ( m == 'text' ) {
      adjustInputIconstoEditor();
    }
  }

  function adjustInputIconstoEditor() {
    var e = editor.menu;
    $( e ).append( '<div class="editortoolbar btn-group-sm float-right mt-1">' +
      '<a href="#" id="sampleDataBtn" title="Sample JSON Data" class="poweredBy" class="samplelink mx-1" onclick="getJsonSampleData();">Sample</a>' +
      '<div class="pointer btn-sm icon icon-check mx-1" title="JSON Validator" id="validateJSON" ></div>' +
      '<div class="pointer btn-sm icon icon-times mx-1" title="Clear" onclick="cleanJSONEditor(\'editor\')"></div>' +
      '<div id="inputcopy" onclick="copy_json()" title="Copy to Clipboard" class="pointer btn-sm btn-shrink icon icon-files-o icon-md mx-1"></div>' +
      '</div>' ), $( e ).show();
  }

  function addInputIconstoEditor() {
    var e = editor.menu.getElementsByClassName( "jsoneditor-poweredBy" );
    $( e ).replaceWith( '<div class="editortoolbar btn-group-sm float-right mt-1">' +
      '<a href="#" id="sampleDataBtn" title="Sample JSON Data" class="poweredBy mx-1" class="samplelink" onclick="getJsonSampleData();">Sample</a>' +
      '<div class="pointer btn-sm icon icon-check mx-1" title="JSON Validator" id="validateJSON" ></div>' +
      '<div class="pointer btn-sm icon icon-times mx-1" title="Clear" onclick="cleanJSONEditor(\'editor\')"></div>' +
      '<div id="inputcopy" onclick="copy_json()" title="Copy to Clipboard" class="pointer btn-sm btn-shrink icon icon-files-o icon-md mx-1"></div>' +
      '</div>' ), $( e ).show(), editor.focus()
  }

  function BuildEditor() {
    addInputIconstoEditor();
  }
  $( '#validateJSON' ).click( function ( e ) {
    e.preventDefault();
    validateJSON();
  } )
  new ClipboardJS( '#inputcopy', {
    text: function () {
      return editor.getText();
    }
  } );
  if ( window.FileReader ) {
    if ( $( '#filesJson' ).length > 0 ) {
      document.getElementById( 'filesJson' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files;
        var ignore_fileTypes = [ 'html', 'txt', 'json' ];
        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(),
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1;
          if ( isSuccess ) {
            for ( var i = 0, f; f = files[ i ]; i++ ) {
              var reader = new FileReader();
              reader.onload = function ( event ) {
                var contents = event.target.result;
                var m = editor.getMode();
                if ( m != 'text' ) {
                  editor.setMode( 'text' );
                }
                editor.setText( contents );
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
} );

function getJsonSampleData() {
  var json = {
    "Array": [ 1, 2, 3 ],
    "Boolean": true,
    "Null": null,
    "Number": 123,
    "Object": {
      "a": "b",
      "c": "d"
    },
    "String": "Hello World"
  };
  editor.set( json );
}

function cleanJSONEditor() {
  editor.setText( "" );
}

function validateJSON() {
  if ( 0 == editor.getText().trim().length ) return setMessage( "error", "Input text are in Empty" ), !1;
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

function loadJsonData() {
  if ( typeof ajax_uri === undefined ) {
    return false;
  }
  var url = $( '#url' ).val();
  var btn = $( '#loadurl' );
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
            obj = $.parseJSON( data )
            if ( "success" in obj ) {
              $( '#loadFromUrl' ).modal( "hide" );
              var e = obj.success;
              var m = editor.getMode();
              if ( m != 'text' ) {
                editor.setMode( 'text' );
              }
              editor.setText( e );
              record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Url ' + loadurl );
            } else if ( "danger" in obj ) {
              alert( 'Unable To Read Url' );
              var loadurl = $( '#url' ).val();
              record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read Url ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadJsonData()' );
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
