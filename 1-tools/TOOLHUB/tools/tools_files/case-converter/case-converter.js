function toProperCase( e ) {
  return e.replace( /\w\S*/g, function ( e ) {
    return e.charAt( 0 ).toUpperCase() + e.substr( 1 ).toLowerCase()
  } )
};

function sentenceCase( e ) {
  for ( var a = e.split( "." ), t = "", r = 0; r < a.length; r++ ) {
    if ( a[ r ].substr( 0, 1 ) != ' ' ) {
      t = t + "." + a[ r ].substr( 0, 1 ).toUpperCase() + a[ r ].substr( 1 )
    } else {
      t = t + "." + a[ r ].substr( 0, 2 ).toUpperCase() + a[ r ].substr( 2 )
    }

  }
  return t.substr( 1 )
}
function convertTo( e ) {
  var a = $( "#input-text" ).val();
  var b = '';
  switch ( e ) {
    case 'upper':
      b = a.toUpperCase();
      break;
    case 'lower':
      b = a.toLowerCase();
      break;
    case 'title':
      b = toProperCase( a );
      break;
    case 'sentence':
      b = sentenceCase( a )
      break;
  }

  $( '#response' ).val( b );


}
