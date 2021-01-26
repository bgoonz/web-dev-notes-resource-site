function javascriptEscapeCode( e ) {
  switch ( e.charAt( 0 ) ) {
    case "\r":
      return "\\r";
    case "\n":
      return "\\n";
    case "\v":
      return "\\v";
    case "'":
      return "\\'";
    case '"':
      return '\\"';
    case "&":
      return "\\&";
    case "\\":
      return "\\\\";
    case "\t":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    default:
      return e
  }
}
function escapeJavascript( e ) {
  var r = "",
    a = 0;
  for ( a = 0; a < e.length; a++ ) r += javascriptEscapeCode( e.charAt( a ), !1 );
  return r;
}

function escape() {

  var r = $( "#input-text" ).val();
  var o = escapeJavascript( r );
  $( "#result" ).val( o );
}
function unEscapeJavaScript( e ) {
  return e.replace( /\\r/g, "\r" ).replace( /\\n/g, "\n" ).replace( /\\'/g, "'" ).replace( /\\\"/g, '"' ).replace( /\\&/g, "&" ).replace( /\\\\/g, "\\" ).replace( /\\t/g, "\t" ).replace( /\\b/g, "\b" ).replace( /\\f/g, "\f" ).replace( /\\x2F/g, "/" ).replace( /\\x3C/g, "<" ).replace( /\\x3E/g, ">" )
}
function un_escape() {
  var r = $( "#input-text" ).val();
  var o = unEscapeJavaScript( r );
  $( "#result" ).val( o );
}
function reset_form() {
  $( '#input-text' ).val( '' );
  $( '#result' ).val( '' );
}
