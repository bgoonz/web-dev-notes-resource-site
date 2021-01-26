editor = null;
$( document ).ready( function () {

  // create the editor
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
    }

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
    $( e ).append( '<div class="editortoolbar btn-group-sm float-right">' +
      '<a href="#" id="sampleDataBtn" title="Sample JSON Data" class="poweredBy" class="samplelink" onclick="getJsonSampleData();">Sample</a>' +


      '<div class="pointer btn-sm icon icon-check mx-1" title="JSON Validator" id="validateJSON" ></div>' +

      '<div class="pointer btn-sm icon icon-times mx-1" title="Clear" onclick="cleanJSONEditor(\'editor\')"></div>' +
      '<div id="inputcopy" onclick="copy_json()" title="Copy to Clipboard" class="pointer btn-sm btn-shrink icon icon-files-o icon-md mx-1"></div>' +


      '</div>' ), $( e ).show();

  }

  function addInputIconstoEditor() {
    var e = editor.menu.getElementsByClassName( "jsoneditor-poweredBy" );
    $( e ).replaceWith( '<div class="editortoolbar btn-group-sm float-right pt-2">' +
        '<a href="#" id="sampleDataBtn" title="Sample JSON Data" class="poweredBy" class="samplelink" onclick="getJsonSampleData();">Sample</a>' +


        '<div class="pointer btn-sm icon icon-check mx-1" title="JSON Validator" id="validateJSON" ></div>' +

        '<div class="pointer btn-sm icon icon-times mx-1" title="Clear" onclick="cleanJSONEditor(\'editor\')"></div>' +
        '<div id="inputcopy" onclick="copy_json()" title="Copy to Clipboard" class="pointer btn-sm btn-shrink icon icon-files-o icon-md mx-1"></div>' +


        '</div>' ), $( e ).show(),
      editor.focus()
  }

  function BuildEditor() {
    addInputIconstoEditor();
  }
  $( '#validateJSON' ).click( function ( e ) {
    e.preventDefault();
    validateJSON();
  } )



  if ( window.FileReader ) {

    if ( $( '#filesJson' ).length > 0 ) {
      document.getElementById( 'filesJson' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object

        var ignore_fileTypes = [ 'html', 'txt', 'json' ];

        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(), //file extension from input file
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1; //is extension not  in acceptable types
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
    //the browser doesn't support the FileReader Object, so do this
    record_activity( 'tool_used', t_n, 'window.FileReader support not available' );

    alert( 'file support not available' );
    //alert('file reader not supported in this browser');
  }
} );

function createJavaObject( i ) {
  var e = {};
  indent = "  ", classesArray = [], classObj = {};
  e = $.parseJSON( i ), classes = createClasses( e, "Json_to_Java", indent );


  try {
    e = $.parseJSON( i ), classes = createClasses( e, "Json_to_Java", indent );
    var n = js_beautify( classes, {
      indent_size: 1,
      indent_char: " "
    } );

    n = n.split( "- >" ).join( "->" ), $( '#result' ).val( n );
  } catch ( i ) {
    editorResult.setValue( "Json to Java Converter Error : \n" + i );
  }
}

function createClass( i, e, n ) {
  var s = "public class " + e + " {\n";
  s = s + parser( i, n ) + "\n}", classesArray.push( s )
}

function createClasses( i, e, n ) {
  return createClass( i, e, n ), classesArray.reverse().join( "\n" )
}

function parser( e, n ) {
  var s = "",
    t = Object.keys( e ),
    r = [],
    a = [],
    c = [];
  for ( i in t ) switch ( r[ i ] = t[ i ][ 0 ].toUpperCase() + t[ i ].slice( 1 ), s += n, typeof e[ t[ i ] ] ) {
    case "string":
      s += "private String " + t[ i ], s += ";\n", a.push( n + "public String get" + r[ i ] + "() {\n" + n + n + "return " + t[ i ] + ";\n" + n + "}" ), c.push( n + "public void set" + r[ i ] + "( String " + t[ i ] + " ) {\n" + n + n + "this." + t[ i ] + " = " + t[ i ] + ";\n" + n + "}" );
      break;
    case "number":
      s += "private float " + t[ i ], s += ";\n", a.push( n + "public float get" + r[ i ] + "() {\n" + n + n + "return " + t[ i ] + ";\n" + n + "}" ), c.push( n + "public void set" + r[ i ] + "( float " + t[ i ] + " ) {\n" + n + n + "this." + t[ i ] + " = " + t[ i ] + ";\n" + n + "}" );
      break;
    case "boolean":
      s += "private boolean " + t[ i ], s += ";\n", a.push( n + "public boolean get" + r[ i ] + "() {\n" + n + n + "return " + t[ i ] + ";\n" + n + "}" ), c.push( n + "public void set" + r[ i ] + "( boolean " + t[ i ] + " ) {\n" + n + n + "this." + t[ i ] + " = " + t[ i ] + ";\n" + n + "}" );
      break;
    default:
      e[ t[ i ] ] instanceof Array ? s += "ArrayList<Object> " + t[ i ] + " = new ArrayList<Object>();\n" : null == e[ t[ i ] ] || null == e[ t[ i ] ] ? ( s += "private String " + t[ i ] + " = null", s += ";\n", a.push( n + "public String get" + r[ i ] + "() {\n" + n + n + "return " + t[ i ] + ";\n" + n + "}" ), c.push( n + "public void set" + r[ i ] + "( String " + t[ i ] + " ) {\n" + n + n + "this." + t[ i ] + " = " + t[ i ] + ";\n" + n + "}" ) ) : ( classObj[ r[ i ] ] = r[ i ] + "Object", s += r[ i ] + " " + classObj[ r[ i ] ] + ";\n", a.push( n + "public " + r[ i ] + " get" + r[ i ] + "() {\n" + n + n + "return " + classObj[ r[ i ] ] + ";\n" + n + "}" ), c.push( n + "public void set" + r[ i ] + "( " + r[ i ] + " " + t[ i ] + "Object ) {\n" + n + n + "this." + classObj[ r[ i ] ] + " = " + t[ i ] + "Object;\n" + n + "}" ), createClass( e[ t[ i ] ], r[ i ], n ) )
  }
  return s += "\n\n // Getter Methods \n\n" + a.join( "\n\n" ) + "\n\n // Setter Methods \n\n" + c.join( "\n\n" )
}

function convert_to_java() {
  if ( 0 == editor.getText().trim().length ) return setMessage( "error", "Input text are in Empty" ), !1;
  try {
    c_json = editor.getText();
    createJavaObject( c_json );
  } catch ( e ) {
    editor.setMode( "text" );

  }
}

function getJsonSampleData() {
  var json = {
    "employees": {
      "employee": [ {
          "id": "1",
          "firstName": "Tom",
          "lastName": "Cruise",
          "photo": "https://pbs.twimg.com/profile_images/735509975649378305/B81JwLT7.jpg"
        },
        {
          "id": "2",
          "firstName": "Maria",
          "lastName": "Sharapova",
          "photo": "https://pbs.twimg.com/profile_images/3424509849/bfa1b9121afc39d1dcdb53cfc423bf12.jpeg"
        },
        {
          "id": "3",
          "firstName": "James",
          "lastName": "Bond",
          "photo": "https://pbs.twimg.com/profile_images/664886718559076352/M00cOLrh.jpg"
        }
      ]
    }
  };

  editor.set( json );
}

function cleanJSONEditor() {
  editor.setText( "" );
}

function copy_json() {
  let ClipBJS = new ClipboardJS( '#inputcopy', {
    text: function ( trigger ) {
      return editor.getText();
    },
  } );
  copyAlert( ClipBJS );
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
