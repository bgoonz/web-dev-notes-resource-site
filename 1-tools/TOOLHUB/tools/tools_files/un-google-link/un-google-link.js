function sectionUrl() {
  var input_textarea, result_textarea, input_textarea_value, url, urlDetails, result_textarea_value;
  input_textarea = $( '#input-text' );
  result_textarea = $( '#result' );
  input_textarea_value = input_textarea.val();


  url = new URI( input_textarea_value );
  urlDetails = url.search( true );

  if ( urlDetails.hasOwnProperty( 'url' ) ) {
    result_textarea_value = urlDetails.url;
  }
  if ( urlDetails.hasOwnProperty( 'imgurl' ) ) {
    result_textarea_value = urlDetails.imgurl;
  }

  result_textarea.val( result_textarea_value );
}
$( 'document' ).ready( function () {
  new ClipboardJS( '#copy_result' );
} )

function reset_form() {
  $( '#input-text' ).val( '' );
  $( '#result' ).val( '' );
}
