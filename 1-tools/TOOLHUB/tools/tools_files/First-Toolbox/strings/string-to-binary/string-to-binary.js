function stb() {
  var e, a, t = $( "#input-text" ).val(),
    r = [],
    i = "";
  for ( e = 0; e < t.length; e++ ) r.push( t[ e ].charCodeAt( 0 ).toString( 2 ) );
  for ( a = 0; a < r.length; a++ ) {
    i += padding_left( r[ a ], "0", 8 ) + " ";
  }
  $( "#input-text" ).val( i );
}
function padding_left( e, a, t ) {
  if ( !e || !a || e.length >= t ) return e;
  for ( var r = ( t - e.length ) / a.length, i = 0; i < r; i++ ) e = a + e;
  return e;
}
