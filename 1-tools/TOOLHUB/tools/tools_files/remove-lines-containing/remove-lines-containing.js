function remove_from_string() {
  var e = $( "#input-text" ).val(),
    n = $( "#contain-text" ).val();
  if ( 0 != e.trim().length ) {
    var b = e.split( "\n" );

    var a = [],
      o = [];
    $.each( b, function ( i, v ) {

      var p = [];
      var lines = v.split( '.' );

      $.each( lines, function ( c, d ) {

        d = d.trim();
        var fl = d.length
        if ( $( "#check_case" ).is( ":checked" ) ) {
          var i = new RegExp( "(" + n + ")", "gi" );
          r = d.trim().replace( i, "" ).length;
        } else {
          r = d.trim().replace( n, "" ).length;
        }

        if ( fl == r ) {
          p.push( d );
        }
      } )
      if ( $.trim( v ) != '' ) {
        var pa = [];
        pa = p.join( '. ' );
        o.push( pa );
        }
        else {
          o.push( '' );
      }
    } )
    var result = o.join( '\n' );

    $( "#input-text" ).val( result );
  }
}
