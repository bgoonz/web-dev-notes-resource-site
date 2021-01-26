function escape() {

  let r = $( "#input-text" ).val();
  let o = escapeCSV( r );
  $( "#result" ).val( o );
}
function escapeCSV( e ) {
  let r = String( e ).replace( /"/g, '""' );
  return '"' != r.charAt( 0 ) && ( r = '"' + r ), '"' != r.charAt( r.length - 1 ) && ( r += '"' ), r
}
function unEscapeCSV( e ) {
  return '"' == e.charAt( 0 ) && ( e = e.substring( 1, e.length ) ), '"' == e.charAt( e.length - 1 ) && ( e = e.substring( 0, e.length - 1 ) ), String( e ).replace( /""/g, '"' )
}

function un_escape() {
  let r = $( "#input-text" ).val();
  let o = unEscapeCSV( r );
  $( "#result" ).val( o );
}

function reset_form() {
  $( '#input-text' ).val( '' );
  $( '#result' ).val( '' );
}
