function reverse_string() {

  var str = $( '#input-text' ).val().split( "" ).reverse().join( "" );
  $( '#input-text' ).val( str );
}
