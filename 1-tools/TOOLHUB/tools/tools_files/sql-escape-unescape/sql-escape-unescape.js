function escapeSQL( e ) {
  return String( e ).replace( /'/g, '"' )
}
function unEscapeSQL( e ) {
  return String( e ).replace( /"/g, "'" )
}


function escape() {
  var r = $( "#input-text" ).val();
  var o = escapeSQL( r );
  $( "#result" ).val( o );
}

function un_escape() {
  var r = $( "#input-text" ).val();
  var o = unEscapeSQL( r );
  $( "#result" ).val( o );
}

function reset_form() {
  $( '#input-text' ).val( '' );
  $( '#result' ).val( '' );
}
