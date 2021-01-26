async function broken_link_checker_form_action() {

  if ( typeof ajax_uri === undefined ) {
    return false;
  }

  let broken_link_checker_form = $( '#input-url' );
  let blc_url = $( '#input-url' );
  let blc_url_val = $.trim( blc_url.val() );
  let blc_results = $( '#analyzeUrlResponse' );
  let blc_results_html = '';
  blc_results.html( '' );
  let blc_submit = $( '#analyzeUrl' );
  let l_status;

  let broken_link_checker_form_offset = broken_link_checker_form.offset();
  $( 'html, body' ).animate( {
    scrollTop: broken_link_checker_form_offset.top - 10
  } );

  let laShow = true;
  if ( blc_url_val == '' || blc_url_val == '127.0.0.1' || blc_url_val == 'localhost' ) {
    laShow = false;
    console.log( 'Invalid Host' );
  }
  if ( laShow ) {
    blc_submit.attr( 'disabled', 'disabled' ).append( ' <i class="icon icon-circle-notch icon-spin icon-dark"></i>' );


    let get_urls = await _sendAjaxAsync( ajax_uri, {
      "url": blc_url_val,
      "fetch": "fetch"
    } );


    if ( get_urls ) {
      if ( get_urls.errors.length <= 0 ) {

        blc_results.parent().removeClass( 'd-none' );

        if ( get_urls.errors.length <= 0 ) {
          blc_results_html += '<table class="table table-hover table-bordered" style="box-shadow: 0px 0px 10px #bbb;">\n' +
            '    <thead>\n' +
            '    <tr>\n' +
            '        <th class="text-center bg-dark text-light">Sr #</th>\n' +
            '        <th class="text-center bg-dark text-light">Link’s URL:</th>\n' +
            '        <th class="text-center bg-dark text-light">No/Do-Follow:</th>\n' +
            '        <th class="text-center bg-dark text-light">Type:</th>\n' +
            '        <th class="text-center bg-dark text-light">Status:</th>\n' +
            '    </tr>\n' +
            '    </thead>\n' +
            '    <tbody>\n';
          if ( get_urls.result.length > 0 ) {
            $.each( get_urls.result, function ( ind, val ) {
              let follow = '<span class="text-danger">No Follow</span>';
              if ( val.follow ) {
                follow = '<span Class="text-success">Do Follow</span>';
              }
              blc_results_html += '    <tr>\n' +
                '        <td class="">' + ( ind + 1 ) + '</td>\n' +
                '        <td class="">' + val.url + '</td>\n' +
                '        <td class="text-center">' + follow + '</td>\n' +
                '        <td class="text-center text-capitalize">' + val.cat + '</td>\n' +
                '        <td class="text-center" id="l_status' + ind + '">&nbsp;&nbsp;&nbsp;</td>\n' +
                '    </tr>\n';
            } );
          } else {
            blc_results_html += '    <tr>\n' +
              '        <td class="text-center" colspan="5">No Links Found.</td>\n' +
              '    </tr>\n';
          }
          blc_results_html += '    </tbody>\n' +
            '</table>\n';

          blc_results.html( blc_results_html );
          if ( get_urls.result.length > 0 ) {
            let i = 0;
            for ( let k of get_urls.result ) {
              $( '#l_status' + i ).html( '<i class="icon icon-spinner icon-pulse icon-dark"></i>' );
              l_status = await _sendAjaxAsync( ajax_uri, {
                "url": k.url,
                "check": "check"
              } );
              if ( l_status ) {
                if ( l_status.result ) {
                  $( '#l_status' + i ).html( '<i class="icon icon-check-circle icon-success"></i>' );
                } else {
                  $( '#l_status' + i ).html( '<i class="icon icon-times-circle icon-danger"></i>' );
                }
              } else {
                $( '#l_status' + i ).html( '<i class="icon icon-times-circle icon-danger"></i>' );
                console.log( 'Error: l_status' );
              }
              i++;
            }
          }
        }
      } else {
        console.log( 'Error => get_urls', get_urls.errors );
        let toast_id = await _makeToasts( 'danger', {
          'body': get_urls.errors.join( ' ' )
        } );
      }
    } else {
      console.log( 'Error: get_urls' );
    }
    blc_submit.removeAttr( 'disabled' ).children( 'i' ).remove();
  }
}
let _sendAjaxAsync = async ( url, params ) => {

  if ( $.trim( url ) != '' && Object.keys( params ).length > 0 ) {

    let query_string = make_query_string( params );


    let ajax_result = new Promise( ( accept ) => {
          $.ajax( {
        url: url,
        type: "POST",
        processData: false,
        dataType: "json",
        data: query_string,
        success: function ( data ) {
            accept( data );
        },
        error: function ( req, status, error ) {
            accept( false );
        }
      } );
      } );

    return ajax_result;
  }
  return false;
};

let make_query_string = ( params ) => {
    if ( Object.keys( params ).length > 0 ) {
      return Object.keys( params ).map( k => encodeURIComponent( k ) + '=' + encodeURIComponent( params[ k ] ) ).join( '&' );
  }
  return false;
};

let _delay = ( ms = 200 ) => new Promise( resolve => setTimeout( resolve, ms ) );
$( '#analyzeUrl' ).click( function () {
  broken_link_checker_form_action()
} )
