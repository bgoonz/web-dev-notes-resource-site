bubbleText = function () {
    var orignalText, convertedTxt, convertedHTML;

  convertedTxt = "";
  convertedHTML = "";
  orignalText = $( '#input-text' ).val();

  for ( var c = 0; c < orignalText.length; c++ ) {
    var p = null;

    var s = orignalText.charAt( c );

    p = ( bubbleTable[ s ] || bubbleTableFlipped[ s ] || s );
    convertedTxt += p;

  }
  $( '#result' ).attr( 'readonly', false ).val( convertedTxt ).attr( 'readonly', true );

}



$( document ).ready( function () {

  var orignalText;
  orignalText = $( '#input-text' );
  $( orignalText ).on( 'keyup', function () {
    bubbleText();
  } );
  } )
