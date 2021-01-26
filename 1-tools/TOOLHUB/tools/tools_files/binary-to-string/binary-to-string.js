function bts() {
  var e = $( "#input-text" ).val(),
    a = "";
  if ( ( e = e.replace( /\s/g, "" ) ).length % 8 != 0 ) a = "???:";
  else
    for ( ; 0 < e.length; ) {
      var t = e.substring( 0, 8 );
      e = e.substring( 8 );
      var r = parseInt( t, 2 );
      a += String.fromCharCode( r )
    }
  $( "#input-text" ).val( a )
}
