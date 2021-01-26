function hTs() {
  for ( var e = $( "#input-text" ).val(), a = "", t = 0; t < e.length; t += 2 ) a += String.fromCharCode( parseInt( e.substr( t, 2 ), 16 ) );
  $( "#input-text" ).val( a )
}
