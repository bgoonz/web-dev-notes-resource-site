var cMeditor1, result;
$( document ).ready( function () {
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    mode: "application/xml",
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
    alignCDATA: true,
  } );
  result = CodeMirror.fromTextArea( document.getElementById( "result" ), {
    mode: "text/x-java",
    lineNumbers: true,
    matchBrackets: true,
  } );
  if ( window.FileReader ) {
    if ( $( '#filesJson' ).length > 0 ) {
      document.getElementById( 'filesJson' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files;
        var ignore_fileTypes = [ 'html', 'txt', 'json', 'xml' ];
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
} );

function createJavaObject( i ) {
  var e = {};
  indent = "  ", classesArray = [], classObj = {};
  try {
    e = $.parseJSON( i ), classes = createClasses( e, "urldecode", indent );
    var n = js_beautify( classes, {
      indent_size: 1,
      indent_char: " "
    } );
    n = n.split( "- >" ).join( "->" );
    result.setValue( n );
  } catch ( i ) {
    result.setValue( "Convert to Java Converter Error : \n" + i );
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
  if ( 0 == cMeditor1.getValue().trim().length ) return setMessage( "error", "Input text are in Empty" ), !1;
  e = cMeditor1.getValue().trim();
  try {
    var t = new X2JS,
      o = vkbeautify.json( t.xml_str2json( e ) );
    let jo = createJavaObject( o );
  } catch ( e ) {
    $( '#result' ).val( 'unable to solve the puzzle' );
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
              cMeditor1.setValue( e );
              record_activity( 'tool_used', t_n, 'Success : AJAX Request Response URL ' + loadurl );
            } else if ( "danger" in obj ) {
              alert( 'Unable To Read URL' );
              var loadurl = $( '#url' ).val();
              record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read URL ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadJsonData()' );
            $( btn ).html( 'Load From URL' );
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
