function convert() {
  var inputTag = $( '#input-text' );
  var oct = inputTag.val();
  try {
    var x = new BigNumber( oct, 8 );
    var resultbb = x.c;
    if ( resultbb ) {
      inputTag.removeClass( 'is-invalid' );
    } else {
      throw Error;
    }
  } catch ( err ) {
    inputTag.addClass( 'is-invalid' );
    return;
  }
  var txt = oct + " = ";
  var d, e, minus = false;
  var len = oct.length;
  if ( oct[ 0 ] == "-" ) {
    txt += "-[";
    oct = oct.substr( 1 );
    len--;
    minus = true;
  }
  var idot = oct.indexOf( "." );
  if ( idot >= 0 ) {
    oct = oct.substring( 0, idot ) + oct.substring( idot + 1, len );
    len--;
  } else idot = len;
  etbl = [ "\u2070", "\u00B9", "\u00B2", "\u00B3", "\u2074", "\u2075", "\u2076", "\u2077", "\u2078", "\u2079" ];
  for ( var i = 0; i < len; i++ ) {
    d = oct.charCodeAt( i );
    if ( d < 58 ) d -= 48;
    e = idot - i - 1;
    e = e.toString();
    txt += "(" + d + " \u00D7 8";
    for ( var k = 0; k < e.length; k++ )
      if ( e[ k ] == "-" )
        txt += "\u207B";
      else
        txt += etbl[ e[ k ] ];
    txt += ")";
    if ( i < len - 1 ) txt += " + ";
  }
  if ( minus ) txt += "]";
  txt += " = " + x.toString( 10 );
  $( '#result' ).html( x.toString( 10 ) );
}
$( '#input-text' ).on( 'keyup', function ( event ) {
  var x = event.which || event.keyCode;
  if ( x == 13 && $.trim( this.value ) != '' ) {
    convert();
  }
} )
$( document ).ready( function () {
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
                $( '#input-text' ).val( contents );
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
              $( '#input-text' ).val( e );
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
