$( "#generaterandom" ).click( function () {

  $( "#guidoutput" ).show(), $( ".bodycontent" ).html( "" );
  var t = $( "#numSeq" ).val(),
    e = "";
  for ( i = 1; i <= t; i++ ) e += '<tr> <th scope="row">' + i + "</th><td>" + generateRandSeq( $( "#lenSeq" ).val(), $( "#letters" ).val() ) + "</td><tr>";
  $( "#guidoutput .bodycontent" ).html( e )


} )

function generateRandSeq( t, e ) {
  var n, s = "";
  for ( n = 1; n <= t; n += 1 ) s += randomChar( e );
  return s
}
function randomInt( t, e ) {
  return Math.floor( Math.random() * ( e - t + 1 ) ) + t
}
function randomChar( t ) {
  return t.charAt( randomInt( 0, t.length - 1 ) )
}
