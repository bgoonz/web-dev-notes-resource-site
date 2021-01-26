var escapeHtmlArray = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
};
function escapeHtml( e ) {
  return String( e ).replace( /[&<>"']/g, function ( e ) {
    return escapeHtmlArray[ e ]
  } )
}
function unEscapeHtml( e ) {
  return String( e ).replace( /&amp;/g, "&" ).replace( /&quot;/g, '"' ).replace( /&apos;/g, "'" ).replace( /&lt;/g, "<" ).replace( /&gt;/g, ">" )
}
function escape() {

  var r = $( "#input-text" ).val();
  var o = escapeHtml( r );
  $( "#result" ).val( o );
}

function un_escape() {
  var r = $( "#input-text" ).val();
  var o = unEscapeHtml( r );
  $( "#result" ).val( o );
}
$( 'document' ).ready( function () {
  new ClipboardJS( '#copy_result' );
} )

function reset_form() {
  $( '#input-text' ).val( '' );
  $( '#result' ).val( '' );
}
