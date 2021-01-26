var cMeditor1, resulteditor;
$( document ).ready( function () {

  // create the editor
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    mode: "x-sql",
    indentWithTabs: true,
    smartIndent: true,
    lineNumbers: true,
    matchBrackets: true,
    autofocus: true,
  } );

  resulteditor = CodeMirror.fromTextArea( document.getElementById( "result" ), {
    matchBrackets: true,
    autoCloseBrackets: true,
    mode: "yaml-frontmatter",
    lineWrapping: true,
    lineNumbers: true,

  } );



  if ( window.FileReader ) {
    //needed to be fixed
    if ( $( '#filesJson' ).length > 0 ) {
      document.getElementById( 'filesJson' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object

        var ignore_fileTypes = [ 'html', 'txt', 'json', 'xml' ];

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


async function sqlTOyaml() {
  var e = cMeditor1.getValue();
  try {
    if ( null != e && 0 != e.trim().length ) {
      if ( -1 == e.toLowerCase().search( "create" ) ) return resulteditor.setValue( "Missing CREATE STATEMENT" ), !1;
      if ( -1 == e.toLowerCase().search( "select" ) ) return resulteditor.setValue( "Missing SELECT STATEMENT" ), !1;
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

      try {
        e = json2yaml( s.trim() ), resulteditor.setValue( e );
        }
        catch ( e ) {
        var r = "";
        r = r + "Error : " + e.message, r = ( r += "\n" ) + "Line : " + e.parsedLine + "  " + e.snippet, resulteditor.setValue( r )
      }

    }
  } catch ( e ) {
    resulteditor.setValue( e.message )
  }
}

function json2yaml( r ) {
  "string" == typeof r && ( r = JSON.parse( r ) );
  var n = [];
  return convert( r, n ), n.join( "\n" )
}

function normalizeString( r ) {
  return r.match( /^[\w]+$/ ) ? r : JSON.stringify( r )
}

function convertString( r, n ) {
  n.push( normalizeString( r ) )
}

function getType( r ) {
  var n = typeof r;
  return r instanceof Array ? "array" : "string" == n ? "string" : "boolean" == n ? "boolean" : "number" == n ? "number" : "undefined" == n || null === r ? "null" : "hash"
}
var spacing = " ";

function convert( r, n ) {
  switch ( getType( r ) ) {
    case "array":
      convertArray( r, n );
      break;
    case "hash":
      convertHash( r, n );
      break;
    case "string":
      convertString( r, n );
      break;
    case "null":
      n.push( "null" );
      break;
    case "number":
      n.push( r.toString() );
      break;
    case "boolean":
      n.push( r ? "true" : "false" )
  }
}

function convertArray( r, n ) {
  for ( var e = 0; e < r.length; e++ ) {
    var t = [];
    convert( r[ e ], t );
    for ( var a = 0; a < t.length; a++ ) n.push( ( 0 == a ? "- \n   " : spacing ) + t[ a ] )
  }
}

function convertHash( r, n ) {
  for ( var e in r ) {
    var t = [];
    if ( r.hasOwnProperty( e ) ) {
      var a = r[ e ];
      convert( a, t );
      var o = getType( a );
      if ( "string" == o || "null" == o || "number" == o || "boolean" == o ) n.push( normalizeString( e ) + ": " + t[ 0 ] );
      else {
        n.push( normalizeString( e ) + ": " );
        for ( var i = 0; i < t.length; i++ ) n.push( spacing + t[ i ] )
      }
    }
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
              record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Url ' + loadurl );
              }
              else if ( "danger" in obj ) {
                alert( 'Unable To Read Url' );
                var loadurl = $( '#url' ).val();
                record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read Url ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadJsonData()' );
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
