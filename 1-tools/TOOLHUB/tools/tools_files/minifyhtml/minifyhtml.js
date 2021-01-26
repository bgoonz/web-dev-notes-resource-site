function minify_html() {
  if ( typeof ajax_uri === undefined ) {
    return false;
  }
  if ( $.trim( $( "#input-text" ).val() ) != "" ) {
    var sendData = {};
    var text = JSON.stringify( $( "#input-text" ).val() );
    var checked = [];
    $( "input[name='opts[]']:checked" ).each( function () {
      checked.push( $( this ).val() );
    } );
    if ( checked.length > 0 ) {
      sendData.options = checked;
    }
    sendData.text = text;
    var ajax_url = ajax_uri;
    if ( $.trim( ajax_url ) != '' ) {
      $.ajax( {
        url: ajax_url,
        type: "POST",
        data: sendData,
        beforeSend: function () {
          $( '#convert_btn' ).html( '<span class="icon icon-cog icon-spin"></span> Please Wait ' );
          $( '#convert_btn' ).attr( 'disabled', true );
          $( '#convert_btn' ).addClass( 'btn-disabled' );
        },
        success: function ( data, textStatus, xhr ) {
          if ( $.trim( data ) != '' ) {
            try {
              $( "#response" ).val( JSON.parse( data ) );
              obj = $.parseJSON( data );
              record_activity( 'tool_used', t_n, "Minified version loaded successfully" );
              $( '#convert_btn' ).attr( 'disabled', false );
              $( '#convert_btn' ).removeClass( 'btn-disabled' );
              $( '#convert_btn' ).html( 'Minify' );
            } catch ( error ) {
              record_activity( 'tool_used', t_n, 'parseJSON error mini html result return' );
            }
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
}
