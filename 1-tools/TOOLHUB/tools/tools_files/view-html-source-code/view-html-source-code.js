function loadSourceView() {
  var url, btn, ajax_url;
  if ( typeof ajax_uri === undefined ) {
    return false;
  }
  url = $( '#input-text' ).val();
  btn = $( '#loadFromUrl' );
  ajax_url = ajax_uri;
  if ( $.trim( url ) != '' ) {

    $.ajax( {
          url: ajax_url,
      type: "POST",
      data: {
        'link': url
      },
      beforeSend: function () {
          $( btn ).removeAttr( 'onclick' );
          $( btn ).html( '<span class="icon icon-cog icon-spin"></span> Loading ' );
          $( btn ).attr( 'disabled', true );
          $( btn ).addClass( 'btn-disabled' );
      },

      success: function ( data, textStatus, xhr ) {
          if ( $.trim( data ) != '' ) {
            var loadurl = $( '#url' ).val();
          var obj = '';
          try {
            obj = $.parseJSON( data )
            if ( "success" in obj ) {
              var e = obj.success;
              $( "#result" ).val( e );
              record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Url ' + loadurl );
              }
              else if ( "danger" in obj ) {
                alert( 'Unable To Read Url' );
                record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read Url ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadSourceView()' );
            $( btn ).html( 'View Source Code' );
            }
            catch ( error ) {
              record_activity( 'tool_used', t_n, 'Error : Unable to decode response of url ' + loadurl );

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
