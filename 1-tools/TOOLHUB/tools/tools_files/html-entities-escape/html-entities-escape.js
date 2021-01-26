function ConvertHtmlEntities() {
  if ( typeof ajax_uri === undefined ) {
    return false;
  }
  var btn, input, inputVal, ajax_url;

  btn = $( '#convertBtn' );
  btn.attr( 'disabled', true );
  input = $( '#input-text' );
  inputVal = input.val();

  ajax_url = ajax_uri;

  if ( $.trim( ajax_url ) != '' && $.trim( inputVal ) != '' ) {
    $.ajax( {
      url: ajax_url,
      type: 'POST',
      data: {
        "rawInput": inputVal,
        "convert": true
      },
      cache: false,
      dataType: 'json',
      success: function ( data ) {

        btn.attr( 'disabled', false );
        try {
          if ( typeof data.error === 'undefined' ) {
            $( "#result" ).val( data.result );
          } else {
            alert( data.success );
          }
        } catch ( e ) {
          record_activity( 'tool_used', t_n, 'unable to parse result' );
        }
      }
    } );
  }
}

function loadJsData() {

  if ( typeof ajax_uri === undefined ) {
    return false;
  }

  var url = $( '#url' ).val();
  var btn = $( '#loadJsUrl' );

  var ajax_url = ajax_uri;
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

            if ( "success" in data ) {

              $( '#loadFromUrl' ).modal( "hide" );
              var e = data.success;
              $( '#input-text' ).val( e );
              record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Url ' + loadurl );
              }
              else if ( "danger" in obj ) {
                alert( 'Unable To Read Url' );
                var loadurl = $( '#url' ).val();
                record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read Url ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadJsData()' );
            $( btn ).html( 'Load From Url' );
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
