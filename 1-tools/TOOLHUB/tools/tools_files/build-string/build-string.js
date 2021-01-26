function build_string() {
  var text = $( '#input-text' ).val();

  if ( $.trim( text ) != '' ) {
    text = text.split( "\n" );
    var ksl = text.length;
    var string_c = "";
    if ( ksl > 0 ) {
      for ( let i = 0; i < ksl; i++ ) {
        if ( $.trim( string_c ) != "" ) {
          string_c += '+ \n'
        }
        string_c += "'" + text[ i ] + "'";

      }
    }

    if ( $.trim( string_c ) != '' ) {
      $( '#input-text' ).val( string_c );
    }
  }
}
