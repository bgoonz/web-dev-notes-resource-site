flipText = function ( backwards, upsideDown, textarea ) {
  var convertedTxt = "";
  var convertedHTML = "";
  var doConvertedHTML = $( 'cConvertedHTML' ).hasClass( 'show' ) ? true : false;
  var this_value = $( textarea ).val();
  for ( var c = ( this_value.length - 1 ); c >= 0; c-- ) {
    var p = null;
    var didConvertedHTML = false;
    var g = ( backwards ) ? c : ( -1 * ( c - this_value.length + 1 ) );
    var s = this_value.charAt( g );
    if ( doConvertedHTML ) {
      var cHTMLLen = convertedHTML.length;
      var cHTMLLast = ( cHTMLLen >= 1 ) ? convertedHTML.charAt( cHTMLLen - 1 ) : "";
      if ( s == " " && ( cHTMLLast == " " || convertedHTML.substring( cHTMLLen - 6 ) == "&nbsp;" ) ) {
        convertedHTML += "&nbsp;";
        didConvertedHTML = true;
      } else if ( s == "\n" ) {
        didConvertedHTML = true;
      } else if ( s == "\r" && cHTMLLast == "\n" && ( cHTMLLen < 2 || s.charAt( cHTMLLen - 2 ) != "\r" ) ) {}
    }
    if ( upsideDown ) {
      p = ( flipTable[ s ] || flipTableFlipped[ s ] || flipTable[ s.toLowerCase() ] || s );
    } else {
      p = s;
    }
    convertedTxt += p;
    if ( doConvertedHTML && !didConvertedHTML ) {
      convertedHTML += ( flipTableHTML[ p ] || HTMLTable[ p ] || p );
      didConvertedHTML = true;
    }
  }
  $( '#result' ).attr( 'readonly', false ).val( convertedTxt ).attr( 'readonly', true );
}

$( document ).ready( function () {

  var orignalText, convertedText, inverseText, upsideDownText;
  inverseText = $( '#backwards' ).is( ':checked' );
  upsideDownText = $( '#upsideDown' ).is( ':checked' );
  $( '#backwards,#upsideDown' ).change( function () {
    inverseText = $( '#backwards' ).is( ':checked' );
    upsideDownText = $( '#upsideDown' ).is( ':checked' );
    orignalText = $( '#input-text' );
    flipText( inverseText, upsideDownText, orignalText );
  } )

  orignalText = $( '#input-text' );
  $( orignalText ).on( 'keyup', function () {
    flipText( inverseText, upsideDownText, this );
  } );

} )
