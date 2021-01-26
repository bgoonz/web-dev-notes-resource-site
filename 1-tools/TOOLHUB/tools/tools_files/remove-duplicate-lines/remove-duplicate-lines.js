function remove_duplicate_lines() {
  var e = $( "#input-text" ).val();
  if ( 0 != e.trim().length ) {
    var a = e.split( "\n" ),
      t = [];
    $.each( a, function ( e, a ) {
      -1 === $.inArray( a.trim(), t ) && t.push( a )
    } ), $( "#input-text" ).val( t.join( "\n" ) )
  }
}
