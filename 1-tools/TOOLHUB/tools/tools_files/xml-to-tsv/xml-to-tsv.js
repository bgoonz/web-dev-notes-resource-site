var cMeditor1;
$( document ).ready( function () {

  // create the editor
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    mode: "application/xml",
    lineNumbers: true,
    smartIndent: true,
    matchBrackets: true,
    autofocus: true,
    alignCDATA: true,
  } );



  if ( window.FileReader ) {
    //needed to be fixed
    if ( $( '#filesJson' ).length > 0 ) {
      document.getElementById( 'filesJson' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object

        var ignore_fileTypes = [ 'html', 'txt', 'xml', 'tsv' ];

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
}, cMeditor1 );
/**/
"function" != typeof String.prototype.enclose && ( String.prototype.enclose = function ( e, t ) {
  if ( void 0 === e && ( e = "" ), void 0 === t && ( t = "" ), "" != t ) {
    var n = new RegExp( e.regExpEscape( e ), "gmi" );
    return e + this.replace( n, t + e ) + e
  }
  return e + this + e
} )
String.prototype.toCsv = function ( e, t, n, r ) {
  void 0 === e && ( e = "," ), void 0 === t && ( t = '"' ), void 0 === n && ( n = t ), void 0 === r && ( r = !1 );
  var a = this.indexOf( t ) >= 0 || this.indexOf( e ) >= 0 || this.indexOf( "\r" ) >= 0 || this.indexOf( "\n" ) >= 0;
  return r && ( a = !0 ), a ? this.enclose( t, n ) : this
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
  } catch ( e ) {
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



function getCSVTOTSV( e ) {
  return e.split( "," ).join( "\t" )
}


/**/
function convert_to_csv() {
  if ( 0 == cMeditor1.getValue().trim().length ) return setMessage( "error", "Input text are in Empty" ), !1;
  e = cMeditor1.getValue().trim();
  try {
    t = $.parseXML( e );
    e = ( new X2JS ).xml2json( t );
    i = jsonToCsv( e, ",", !0, !1, !1 )
    tsv = getCSVTOTSV( i );
    $( '#result' ).val( tsv );
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
