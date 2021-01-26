function developArray() {
  var a, a_val, m, result, nc;
  a = $( '#input-text' );
  result = $( '#result' );
  a_val = a.val();
  if ( $.trim( a_val ) != '' ) {
    m = a_val.split( "\n" );
    nc = '[';
    $.each( m, function ( m, n ) {
      if ( $.trim( n ) != '' ) {
        nc += "'" + n + "',\n";
      }
    }, nc )
    nc += ']';
    $( result ).val( nc );
  } else {
    if ( $.trim( a_val ) == '' ) {
      $( a ).addClass( 'is-invalid' );
    }
  }
}

function reset_form() {
  $( '#input-text' ).val( '' );
  $( '#result' ).val( '' );
}
