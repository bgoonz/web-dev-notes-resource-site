$( function () {
  $( '#generatePass' ).click( function () {
    var userName, pass, path;
    if ( typeof ajax_uri === undefined ) {
      return false;
    }
    userName = $( '#username' ).val();
    pass = $( '#pass' ).val();
    path = $( '#path' ).val();
    if ( $.trim( userName ) != '' && $.trim( pass ) != '' && $.trim( path ) != '' ) {
      if ( $( '#username' ).hasClass( 'is-invalid' ) ) $( '#username' ).removeClass( "is-invalid" );
      if ( $( '#pass' ).hasClass( 'is-invalid' ) ) $( '#pass' ).removeClass( "is-invalid" );
      if ( $( '#path' ).hasClass( 'is-invalid' ) ) $( '#path' ).removeClass( "is-invalid" );
      $.ajax( {
        url: ajax_uri,
        type: "POST",
        data: {
          un: userName,
          password: pass,
          filePath: path
        },
        success: function ( data ) {
          if ( $.trim( data ) != '' ) {
            var pass = JSON.parse( data );
            $( '#pass_gen' ).attr( 'disabled', false ).val( pass[ 0 ] ).attr( 'disabled', true );
            var htfcHtml = 'AuthType Basic\n' +
              'AuthName "Password Protected Area"\n' +
              'AuthUserFile ' + path + '\n' +
              'Require valid-user';
            $( '#htafc' ).val( htfcHtml );
            $( '#resultArea' ).removeClass( 'd-none' );
          }
        }
      } );
    } else {
      if ( $.trim( userName ) == '' ) {
        $( '#username' ).addClass( "is-invalid" );
      }
      if ( $.trim( pass ) == "" ) {
        $( '#pass' ).addClass( "is-invalid" );
      }
      if ( $.trim( path ) == '' ) {
        $( '#path' ).addClass( "is-invalid" );
      }
    }
  } );
} )

function ClearFields() {
  $( '#pass_gen' ).val( '' );
  $( '#htafc' ).val( '' );
  $( '#username' ).val( '' ).removeClass( 'is-invalid' );
  $( '#pass' ).val( '' ).removeClass( 'is-invalid' );
  $( '#path' ).val( '' ).removeClass( 'is-invalid' );
  $( '#resultArea' ).addClass( 'd-none' );
}
