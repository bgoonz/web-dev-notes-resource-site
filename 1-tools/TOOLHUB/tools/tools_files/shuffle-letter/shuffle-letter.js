function shuffledText() {
  var t = $( "#input-text" ).val().trim();
  if ( "" != t ) {
    var e = shuffle( t.split( "" ) );
    $( "#result" ).val( e.join( "" ) )
  }
}
function shuffle( t ) {
  for ( var e, n, s = t.length; 0 !== s; ) n = Math.floor( Math.random() * s ), e = t[ s -= 1 ], t[ s ] = t[ n ], t[ n ] = e;
  return t
}
