var cMeditor1, resulteditor, newXMLV, oldXMLV;

$( document ).ready( function () {


  // create the editor
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    matchBrackets: true,
    autoCloseBrackets: true,
    mode: "application/xml",
    lineWrapping: true,
    lineNumbers: true,

  } );
  cMeditor1.on( 'change', function ( cMeditor1 ) {
        xmlBeatuify( cMeditor1 )

  } )

  resulteditor = CodeMirror.fromTextArea( document.getElementById( "result" ), {
    matchBrackets: true,
    autoCloseBrackets: true,
    mode: "application/html",
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
            }
            else {
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

function xmlBeatuify( codeMirror ) {

  try {
    newXMLV = codeMirror.getValue();
    $.parseXML( codeMirror.getValue() );

    if ( $.trim( newXMLV ) != $.trim( oldXMLV ) ) {
      oldXMLV = newXMLV;
      var start_cursor = codeMirror.getCursor();
      codeMirror.setValue( vkbeautify.xml( codeMirror.getValue() ) );
      codeMirror.setCursor( start_cursor );

    }
    if ( resulteditor.getValue() == 'Invalid XML' ) {
      resulteditor.setValue( '' )
    }
  } catch ( e ) {
    resulteditor.setValue( 'Invalid XML' )

  }


}
function convertToHtml() {
  var t = cMeditor1.getValue(),
    r = null;
  if ( null != t && 0 != t.length ) {


    if ( "undefined" == typeof X2JS ) {
      console.log( 'File Not Found' );
      return false;
    }

    var o = new X2JS;
    try {
      t = $.parseXML( t )
      }
      catch ( e ) {
        resulteditor.setValue( "Invalid XML" )
    }
    var n = o.xml2json( t );
    let r = '';
    try {
      r = jsonToCsv( n, ",", !0, !1, !1 )
      toHTML( r );
      }
      catch ( e ) {
        return console.log( e );
    }


  }
}
function viewManager( e ) {
  let iframeContainer, cmContainer;
  iframeContainer = $( '#iframeContainer' );
  cmContainer = $( '#editorContainer' );
  inputVal = cMeditor1.getValue();

  if ( inputVal.trim() == '' ) return false;

  if ( e == "iframe" ) {
    cmContainer.addClass( 'd-none' );
    iframeContainer.removeClass( 'd-none' );
  } else if ( e == "editor" ) {
    iframeContainer.addClass( 'd-none' );
    cmContainer.removeClass( 'd-none' );
  }
}

function convertToHtmlTable( actionToggle ) {
  viewManager( actionToggle );
  convertToHtml();
}
function convertToRawHtml( actionToggle ) {
  viewManager( actionToggle );
  convertToHtml();
}

function toHTML( e, t, o ) {
  var a = "";
  if ( null == e ? ( a = cMeditor1.getValue(), t = "csv" ) : a = e, 0 != a.trim().length ) {
    var i = "",
      n = "<tr>",
      r = Papa.parse( a ),
      l = r.data,
      s = l.slice( 1, l.length );
      s.sort( function ( e, t ) {
      return t.length - e.length
    } ), 0 == s.length && ( s = r.data );
    for ( var d = 0; d < s[ 0 ].length; d++ ) d < l[ 0 ].length ? n += "<th>" + l[ 0 ][ d ] + "</th>" : n += "<th>COLUMN" + ( d + 1 ) + "</th>";
    n += "</tr>";
    for ( var c = 1; c < l.length; c++ ) {
      i += "<tr>";
      for ( d = 0; d < s[ 0 ].length; d++ ) d < l[ c ].length ? i += "<td>" + l[ c ][ d ] + "</td>" : i += "<td>&nbsp</td>";
      i += "</tr>"
    }
    var u = "<table style='width: 100%' ><thead>\n" + n + "</thead><tbody>\n" + i + "</tbody></table>";
    if ( void 0 !== o && 1 == o ) return u;
    htmlOutput( u )
    }
    else {
    // show error
  }
}
function htmlOutput( e ) {
  var r = e;
  if ( null != r && 0 < r.trim().length ) {


    var n = "<!DOCTYPE html><html>\n";
    n = n + "<head><meta charset='UTF-8'><title> XML To HTML using " + window.location.hostname + "</title></head>\n";
    n += "<body>\n";
    n += r;
    n += "\n</body>\n";
    n += "</html>";
    resulteditor.setValue( vkbeautify.xml( n ) );
    var previewFrame = document.getElementById( 'html-view' );
    previewFrame.innerHTML = r;
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
              }
              else if ( "danger" in obj ) {
                alert( 'Unable To Read URL' );
                var loadurl = $( '#url' ).val();
                record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read URL ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadJsonData()' );
            $( btn ).html( 'Load From URL' );
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

function getJsonLevel( e ) {
  "string" == typeof e && ( e = JSON.parse( e ) );
  var t, n, r = JSON.stringify( e, null, "\t" ).split( /\r\n|\n|\r/gm ),
    a = 0;
  for ( t = 0; t < r.length; t++ ) "\t" == r[ t ].charAt( 0 ) && ( n = r[ t ].match( /\t+/gm ) )[ 0 ].length > a && ( a = n[ 0 ].length );
  return a + 1
}

function jsonToCsv( objArray, delimiter, bIncludeHeaders, bQuotes, noMultiLines ) {


  var array, str = "",
    line = "",
    i, j, index, value, columns = [];
  try {
    array = "object" != typeof objArray ? JSON.parse( objArray ) : objArray
    }
    catch ( e ) {
      array = eval( "array=" + objArray )
  }
  var depth = getJsonLevel( array );
  if ( 2 == depth && _.isArray( array ) ) {
    for ( bIncludeHeaders && ( value = "Field1", line += bQuotes ? '"' + value.replace( /"/g, '""' ) + '"' + delimiter : value.toCsv( delimiter, '"' ), str += line + "\n" ), i = 0; i < array.length; i++ ) {
      var line = "";
      value = array[ i ], null == value ? value = "" : value += "", noMultiLines && ( value = value.replace( /\r\n|\r|\n/g, " " ) ), line += ( bQuotes ? '"' : "" ) + ( "" + value ).toCsv( delimiter, '"' ) + ( bQuotes ? '"' : "" ), str += line + "\n"
    }
    return str
  }
  if ( 3 == depth && _.isArray( array ) && _.every( _.values( array ), _.isArray ) ) {
    if ( bIncludeHeaders ) {
      var head = array[ 0 ];
      for ( index in array[ 0 ] ) value = "Field" + ( 1 * index + 1 ), columns.push( value ), line += bQuotes ? '"' + value.replace( /"/g, '""' ) + '"' + delimiter : value.toCsv( delimiter, '"' ) + delimiter;
      line = line.slice( 0, -1 ), str += line + "\n"
    } else
      for ( index in array[ 0 ] ) columns.push( index );
      for ( i = 0; i < array.length; i++ ) {
      var line = "";
      for ( j = 0; j < columns.length; j++ ) value = array[ i ][ j ], null == value ? value = "" : value += "", noMultiLines && ( value = value.replace( /\r\n|\r|\n/g, " " ) ), line += ( bQuotes ? '"' : "" ) + ( "" + value ).toCsv( delimiter, '"' ) + ( bQuotes ? '"' : "" ) + delimiter;
      line = line.slice( 0, -1 * delimiter.length ), str += line + "\n"
    }
    return str
  }
  for ( ; _.isObject( array ) && !_.isArray( array ) && 1 == _.keys( array ).length && ( _.isObject( _.values( array )[ 0 ] ) || _.isArray( _.values( array )[ 0 ] ) && _.isObject( _.values( array )[ 0 ][ 0 ] ) ); ) array = _.values( array )[ 0 ];
  for ( 0 == _.isArray( array ) && 1 == _.isObject( array ) && ( array = JSON.flatten( array ), array = JSON.parse( "[" + JSON.stringify( array ) + "]" ) ), i = 0; i < array.length; i++ ) value = array[ i ][ columns[ j ] ], 0 == _.isArray( value ) && 1 == _.isObject( value ) && ( array[ i ][ columns[ j ] ] = JSON.flatten( value ) );
  if ( bIncludeHeaders ) {
    var head = array[ 0 ];
    if ( bQuotes )
      for ( index in array[ 0 ] ) value = index + "", columns.push( value ), line += '"' + value.replace( /"/g, '""' ) + '"' + delimiter;
    else
      for ( index in array[ 0 ] ) value = index + "", columns.push( value ), line += value.toCsv( delimiter, '"' ) + delimiter;
      line = line.slice( 0, -1 ), str += line + "\n"
  } else
    for ( index in array[ 0 ] ) columns.push( index );
    for ( i = 0; i < array.length; i++ ) {
    var line = "";
    if ( bQuotes )
      for ( j = 0; j < columns.length; j++ ) value = array[ i ][ columns[ j ] ], "[object Object]" == ( value + "" ).substring( 0, 15 ) && ( value = JSON.valueArray( array[ i ][ columns[ j ] ] ).slice( 0, -1 ) ), null == value ? value = "" : value += "", noMultiLines && ( value = value.replace( /\r\n|\r|\n/g, " " ) ), line += '"' + value.replace( /"/g, '""' ) + '"' + delimiter;
    else
      for ( j = 0; j < columns.length; j++ ) value = array[ i ][ columns[ j ] ], "[object Object]" == ( value + "" ).substring( 0, 15 ) && ( value = JSON.valueArray( array[ i ][ columns[ j ] ] ).slice( 0, -1 ) ), null == value ? value = "" : value += "", noMultiLines && ( value = value.replace( /\r\n|\r|\n/g, " " ) ), line += ( "" + value ).toCsv( delimiter, '"' ) + delimiter;
      line = line.slice( 0, -1 * delimiter.length ), str += line + "\n"
  }

  return str
}


"function" != typeof String.prototype.enclose && ( String.prototype.enclose = function ( e, t ) {
      if ( void 0 === e && ( e = "" ), void 0 === t && ( t = "" ), "" != t ) {
        var n = new RegExp( e.regExpEscape( e ), "gmi" );
        return e + this.replace( n, t + e ) + e
  }
  return e + this + e
} )
JSON.valueArray = function ( e ) {
  var l = "";
  return function e( t, n ) {
      if ( Object( t ) !== t ) l += t + "|";
      else if ( Array.isArray( t ) ) {
        for ( var r = 0, a = t.length; r < a; r++ ) e( t[ r ], n ? n + "." + r : "" + r );
        0 == a && ( l += "|" )
    } else {
      var o = !0;
      for ( var i in t ) o = !1, e( t[ i ], n ? n + "." + i : i );
      o && ( l += "|" )
    }
  }( e, "" ), l
}
String.prototype.toCsv = function ( e, t, n, r ) {
    void 0 === e && ( e = "," ), void 0 === t && ( t = '"' ), void 0 === n && ( n = t ), void 0 === r && ( r = !1 );
    var a = 0 <= this.indexOf( t ) || 0 <= this.indexOf( e ) || 0 <= this.indexOf( "\r" ) || 0 <= this.indexOf( "\n" );
    return r && ( a = !0 ), a ? this.enclose( t, n ) : this
}
JSON.flatten = function ( e ) {
  var l = {};
  return function e( t, n ) {
      if ( Object( t ) !== t ) l[ n ] = t;
      else if ( Array.isArray( t ) ) {
        for ( var r = 0, a = t.length; r < a; r++ ) e( t[ r ], n ? n + "." + r : "" + r );
        0 == a && ( l[ n ] = [] )
    } else {
      var o = !0;
      for ( var i in t ) o = !1, e( t[ i ], n ? n + "." + i : i );
      o && ( l[ n ] = {} )
    }
  }( e, "" ), l
}
String.prototype.regExpEscape = function ( e ) {
    return e.replace( /[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&" )
}
