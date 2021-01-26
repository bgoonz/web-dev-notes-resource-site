var handleFileSelect, row_collector;

function toggleHtml() {
  $( '#frm' ).toggleClass( 'd-none' );
  $( '#result-container' ).toggleClass( 'd-none' );
  $( '#show' ).toggleClass( 'd-none' );
  $( '#hide' ).toggleClass( 'd-none' );
}


$( document ).ready( function () {

  eidtorSelector = '#input-text';



  if ( window.FileReader ) {

    if ( $( '#csv_file' ).length > 0 ) {

      $( '#csv_file' ).on( 'change', function ( event ) {
        handleFileSelect( event );
      } );
      document.getElementById( 'csv_file' ).addEventListener( 'change', handleFileSelect, false );
    }


  } else {
    //the browser doesn't support the FileReader Object, so do this
    record_activity( 'tool_used', t_n, 'window.FileReader support not available' );

    alert( 'file support not available' );
    //alert('file reader not supported in this browser');
  }
  handleFileSelect = function ( evt ) {
    var files = evt.target.files; // FileList object

    var ignore_fileTypes = [ 'html' ];

    if ( files && files[ 0 ] ) {
      var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(), //file extension from input file
        isSuccess = ignore_fileTypes.indexOf( extension ) > -1; //is extension not  in acceptable types
      if ( isSuccess ) {
        record_activity( 'tool_used', t_n, 'Browse Button Clicked' );
        prep_send_ajax( files[ 0 ] );
      } else {
        alert( 'File Type Not Supported' );
      }
    }
    return false;
  }


  function prep_send_ajax( user_file ) {

    if ( typeof ajax_uri === undefined ) {
      return false;
    }
    var btn, browse_btn, ajax_url, file_name, data, comma_separated_data, single_row;

    btn = $( '#excel_file' );
    btn.attr( 'disabled', true );
    browse_btn = $( '#browse-btn' );

    browse_btn.addClass( 'disabled' );

    ajax_url = ajax_uri;

    if ( $.trim( ajax_url ) != '' ) {

      file_name = 'user_File';
      data = new FormData();
      data.append( file_name, user_file );

      $.ajax( {
        url: ajax_url,
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function ( data, textStatus, jqXHR ) {
            btn.attr( 'disabled', false );
            browse_btn.removeClass( 'disabled' );

          try {
            if ( typeof data.error === 'undefined' ) {
              btn.attr( 'disabled', false );
              browse_btn.removeClass( 'disabled' );
              comma_separated_data = data.success;
              row_collector = '';
              $( comma_separated_data ).each( function ( d, m ) {
                    single_row = Object.values( m )
                    $( single_row ).each( function ( b, k ) {
                          row_collector += k + "\n";

                }, row_collector )
                }, row_collector )

              $( "#result" ).val( row_collector );
              }
              else {
                alert( data.success );
            }
          } catch ( e ) {
            record_activity( 'tool_used', t_n, 'unable to parse result' );
          }
        }
      } );
    }

  }


}, row_collector, handleFileSelect )

function download_file() {

  if ( $.trim( row_collector ) != '' ) {
    var file = new File( [ row_collector ], "url-decode.com.csv", {
      type: "text/plain;charset=utf-8"
    } );
    saveAs( file );
  }
}
function htmlTocsv() {

  var a = $( '#input-text' ).val();
  if ( $.trim( a ) == '' ) return false;
  tables_data = a.match( /(<table[^>]*>(?:.|\n)*?<\/table>)/gi );
  $( '#hidden_html' ).html( tables_data );
  var i = [],
    r = "";
  $( "#hidden_html table th" ).each( function () {
    i.push( $( this ).text() );
  } )
  $( "#hidden_html table tr" ).each( function ( e ) {
    var t = [];
    $( this ).find( "td" ).each( function ( e ) {
    t.push( $( this ).text() )
    } ), r += t.join() + "\n"
    } )
    $( '#result' ).val( i.join() + r );
}
function loadHtmlSampleData() {
  if ( typeof ajax_uri === undefined ) {
    return false;
  }
  var btn, browse_btn, ajax_url, data, comma_separated_data, single_row;



  $( '#result' ).val( '' );

  btn = $( '#excel_file' );
  btn.attr( 'disabled', true );
  browse_btn = $( '#browse-btn' );

  browse_btn.addClass( 'disabled' );

  ajax_url = ajax_uri;

  if ( $.trim( ajax_url ) != '' ) {

    data = {
      'file': 'sample-data'
    };


    $.ajax( {
      url: ajax_url,
      type: 'POST',
      dataType: 'json',
      data: data,

      success: function ( data, textStatus, jqXHR ) {

        btn.attr( 'disabled', false );
        browse_btn.removeClass( 'disabled' );
        comma_separated_data = data.success;
        row_collector = '';
        $( comma_separated_data ).each( function ( d, m ) {
              single_row = Object.values( m )
              $( single_row ).each( function ( b, k ) {
                    row_collector += k + "\n";

          }, row_collector )
          }, row_collector )

        $( "#result" ).val( row_collector );
      }

    } );
  }

}
