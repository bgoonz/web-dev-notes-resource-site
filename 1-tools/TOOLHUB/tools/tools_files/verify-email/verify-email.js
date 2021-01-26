function checkEmailValidity() {

  if ( typeof ajax_uri === undefined ) {
    return false;
  }

  var email = $( '#input-text' ).val();
  var btn = $( '#checkEmailBtn' );

  var ajax_url = ajax_uri;
  if ( $.trim( email ) != '' ) {

    $.ajax( {
          url: ajax_url,
      type: "POST",
      data: {
        'email': email
      },
      dataType: "json",
        beforeSend: function () {
          $( '#responseHide' ).addClass( 'd-none' )
          $( '#email' ).html( email );
          $( btn ).removeAttr( 'onclick' );
          $( btn ).html( '<span class="icon icon-cog icon-spin"></span> Loading ' );
          $( btn ).attr( 'disabled', true );
          $( btn ).addClass( 'btn-disabled' );
      },

      success: function ( data ) {

        $( btn ).attr( 'disabled', false );
        $( btn ).removeClass( 'btn-disabled' );
        $( btn ).attr( 'onclick', 'checkEmailValidity()' );
        $( btn ).html( 'Check Email Validity' );

        if ( data.errors.length == 0 ) {
          if ( data.result.found ) {
            $( '#status' ).html( 'Email Is Valid' );
          } else {
            $( '#status' ).html( 'Email is Invalid' );
          }

          $( '#mxRecord' ).html( data.result.mx );
          $( '#mxRIp' ).html( data.result.mx_ip );
          $( '#responseError' ).addClass( 'd-none' );
          $( '#responseSuccess' ).removeClass( 'd-none' );

        } else {

          $( '#responseError' ).removeClass( 'd-none' );
          $( '#responseSuccess' ).addClass( 'd-none' );
          $( '#responseError' ).html( 'We Found ' + email + ' as Invalid email address due to ' + data.errors[ 0 ] );
        }
        $( '#responseHide' ).removeClass( 'd-none' );

      },
      complete: function ( xhr, textStatus ) {
          if ( '' != $.trim( xhr.status ) ) {
            record_activity( 'tool_used', t_n, 'Ajax request response ' + xhr.status );
        }

      }
    } );
  }
}
