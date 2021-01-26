$( document ).ready( function () {
  var url = new URL( window.location.href );
  var c = url.searchParams.get( "text" );
  var v = url.searchParams.get( "mode" );
  var obj = document.getElementById( 'input-text' );
  $( '#input-text' ).val( '' );
  obj.value = c;
  if ( c !== null ) {
    if ( v !== null ) {
      var n = c.search( "%" );
      if ( v == 'encode' ) {
        if ( n < 0 ) {
          enc();
        }
      } else if ( v == 'decode' ) {
        if ( n > 0 ) {
          dec();
        }
      }
    } else {}
  }
} );

function containsEncodedComponents( x ) {
  return ( decodeURI( x ) !== decodeURIComponent( x ) );
}

function enc() {
  var obj = document.getElementById( 'input-text' );
  var unencoded = obj.value;
  if ( !containsEncodedComponents( unencoded ) ) {
    var encoded = encodeURIComponent( unencoded ).replace( /'/g, "%27" ).replace( /"/g, "%22" );
    if ( $.trim( obj.value ) != '' ) {
      var m = 'e';
      key = 'text';
      val = encoded;
      insertParam( key, val, m );
      key = 'mode';
      val = 'encode';
      insertParam( key, val, m );
      obj.value = encoded;
    }
  }
}

function dec() {
  var obj = document.getElementById( 'input-text' );
  var encoded = obj.value;
  var decoded = decodeURIComponent( encoded.replace( /\+/g, " " ) );
  obj.value = decoded
  if ( $.trim( obj.value ) != '' ) {
    var m = 'd';
    key = 'text';
    val = decoded;
    insertParam( key, val, m );
    key = 'mode';
    val = 'decode';
    insertParam( key, val, m );
  }
}

function insertParam( key, value, mode ) {
  var n = value.search( "%" );
  if ( n < 0 ) {
    value = encodeURIComponent( value ).replace( /'/g, "%27" ).replace( /"/g, "%22" );
  }
  var kvp = document.location.search.substr( 1 ).split( '&' );
  if ( $.trim( kvp ) != '' ) {
    var i = kvp.length;
    var x;
    while ( i-- ) {
      if ( kvp[ i ].length > 0 ) {
        x = kvp[ i ].split( '=' );
        if ( x[ 0 ] == key ) {
          x[ 1 ] = value;
          kvp[ i ] = x.join( '=' );
          break;
        }
      }
    }
    if ( i < 0 ) {
      kvp[ kvp.length ] = [ key, value ].join( '=' );
    }
    kvp = kvp.join( '&' );
    var uri = window.location.toString();
    if ( uri.indexOf( "?" ) > 0 ) {
      var clean_uri = uri.substring( 0, uri.indexOf( "?" ) );
      window.history.replaceState( {}, document.title, clean_uri );
    }
  } else {
    if ( mode == 'e' ) {
      kvp = 'text=' + value + '&mode=encode';
    } else if ( mode == 'd' ) {
      kvp = 'text=' + value + '&mode=decode';
    }
  }
  window.history.pushState( "object or string", "Title", "?" + kvp + "" );
}
