function remove_empty_lines() {
  var e = $( "#input-text" ).val();
  if ( 0 != e.trim().length ) {
    var a = e.split( "\n" ),
      t = [];
    $.each( a, function ( e, a ) {
      0 != a.trim().length && t.push( a )
    } ), $( "#input-text" ).val( t.join( "\n" ) )
  }
}
