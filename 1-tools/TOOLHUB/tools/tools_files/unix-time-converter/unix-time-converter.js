$( document ).ready( function () {
      $( '.select2' ).select2();
      $( '#uts' ).val( Math.floor( +new Date() / 1000 ) );

} );

function ConvertDate() {

  if ( typeof ajax_uri === undefined ) {
    return false;
  }

  var unix_date = $( '#uts' ).val();

  var date_format = $( '#format' ).val();
  var zone = $( '#zone' ).val();

  var btn = $( '#loadJsUrl' );

  var ajax_url = ajax_uri;
  if ( $.trim( url ) != '' ) {

    $.ajax( {
          url: ajax_url,
      type: "POST",
      data: {
        'u_d': unix_date,
        'df': date_format,
        'zone': zone
      },
      success: function ( data, textStatus, xhr ) {
        var obj = '';
        try {
          obj = $.parseJSON( data );
          if ( "success" in obj ) {


            var e = obj.success;
            $( '#result' ).html( '<h3 class="text-success">' + e + '</h3>' );
            $( '#result' ).parent().removeClass( 'd-none' );
            record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Url ' + loadurl );
            }
            else if ( "danger" in obj ) {
              $( '#result' ).html( "Something went wrong" );
              $( '#result' ).parent().removeClass( 'd-none' );
              record_activity( 'tool_used', t_n, 'Error :  ' + obj.danger );
          }

        } catch ( error ) {
          record_activity( 'tool_used', t_n, 'Error : Unable to decode response ' + data );

        }

      },
      complete: function ( xhr, textStatus ) {
          if ( '' != $.trim( xhr.status ) ) {
            record_activity( 'tool_used', t_n, 'Ajax request response ' + xhr.status );
        }

      }
    } );
  }
}
$( '#refreshTS' ).click( () => {
      $.ajax( {
            url: ajax_uri,
    type: "POST",
    data: {
      'refresh': "ts"
    },
    success: function ( data ) {
      var obj = '';
      try {
        obj = $.parseJSON( data );
        if ( "success" in obj ) {


          var e = obj.success;
          $( '#uts' ).val( e );

          record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Refresh Time Url ' + loadurl );
          }
          else if ( "danger" in obj ) {

          record_activity( 'tool_used', t_n, 'Error :  ' + obj.danger );
        }

      } catch ( error ) {
        record_activity( 'tool_used', t_n, 'Error : Unable to decode response ' + data );

      }

    },
    complete: function ( xhr, textStatus ) {
        if ( '' != $.trim( xhr.status ) ) {
          record_activity( 'tool_used', t_n, 'Ajax request response ' + xhr.status );
      }

    }
  } );
  } )
