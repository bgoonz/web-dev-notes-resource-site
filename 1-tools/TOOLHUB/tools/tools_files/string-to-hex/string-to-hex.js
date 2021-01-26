function strTohex() {
  for ( var e = $( "#input-text" ).val(), a = "", t = 0; t < e.length; t++ ) a += "" + e.charCodeAt( t ).toString( 16 );
  $( "#input-text" ).val( a );
}
