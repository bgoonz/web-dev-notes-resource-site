function generateGuid() {
  let t = $( "#howmany" ).val(),
    e = $( "#hyphens" ).prop( "checked" ),
    n = $( "#uppercase" ).prop( "checked" ),
    s = $( "#braces" ).prop( "checked" ),
    i = $( "#base64encode" ).prop( "checked" ),
    a = ( $( "#urlencode" ).prop( "checked" ), "" );
  for ( o = 1; o <= t; o++ ) {
    var l = prepareGuid();
    if ( 1 != e ) {
      l = l.replace( /-/g, "" )
    }
    if ( 1 == n ) {
      l = l.toUpperCase()
    }
    if ( 1 == s ) l = "{" + l + "}"
    //if(1 == s){l = "{" + l + "}"}
    if ( 1 == i ) l = btoa( l );

    $( "#guidoutput" ).show(), a += '<tr> <th scope="row">' + o + "</th><td>" + l + "</td></tr>", $( "#guidoutput .bodycontent" ).html( a )


  }
}
function prepareGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function ( t ) {
    var e = 16 * Math.random() | 0;
    return ( "x" == t ? e : 3 & e | 8 ).toString( 16 )
    } )
}
