var handleFileSelect, downloadHtml;

function toggleHtml() {
  $( '#frm' ).toggleClass( 'd-none' );
  $( '#result-container' ).toggleClass( 'd-none' );
  $( '#show' ).toggleClass( 'd-none' );
  $( '#hide' ).toggleClass( 'd-none' );
}


$( document ).ready( function () {
      var ifrm = $( '#frm_data' );
      $( '#result' ).val( '' );
      ifrm.ready( function () {
        ifrm.contents().find( "body" ).html( "" );
      } );



  if ( window.FileReader ) {

    if ( $( '#excel_file' ).length > 0 ) {
      $( '#excel_file' ).on( 'change', function ( event ) {
        handleFileSelect( event );
      } );
      document.getElementById( 'excel_file' ).addEventListener( 'change', handleFileSelect, false );

    }


  } else {
    //the browser doesn't support the FileReader Object, so do this
    record_activity( 'tool_used', t_n, 'window.FileReader support not available' );

    alert( 'file support not available' );
    //alert('file reader not supported in this browser');
  }
  handleFileSelect = function ( evt ) {


    var files = evt.target.files; // FileList object

    var ignore_fileTypes = [ 'xlsx', 'xls' ];

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
    var btn, browse_btn, ajax_url, file_name, data;

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
              $( '#result' ).val( data.success.body );
              ifrm.ready( function () {

                if ( ( "style" in data.success ) ) {
                  ifrm.contents().find( "head" ).html( "" ).append( data.success.style );
                }
                if ( ( "body" in data.success ) ) {
                  ifrm.contents().find( "body" ).html( "" ).append( data.success.body );
                }
              } );
              downloadHtml = '';
              if ( ( "head" in data.success ) ) {
                downloadHtml += data.success.head;
              }
              if ( ( "style" in data.success ) ) {
                downloadHtml += data.success.style;
              }
              if ( ( "body" in data.success ) ) {
                downloadHtml += data.success.body;
              }
              if ( ( "footer" in data.success ) ) {
                downloadHtml += data.success.footer;
              }
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



}, downloadHtml, handleFileSelect )

function download_file() {
  if ( $.trim( downloadHtml ) != '' ) {
    var file = new File( [ downloadHtml ], "url-decode.com.txt", {
      type: "text/plain;charset=utf-8"
    } );
    saveAs( file );
  }
}

function loadExcelSampleData() {
  var new_sample_data, ifrm;
  try {
    new_sample_data = JSON.parse( sample_data );
    $( '#result' ).val( new_sample_data.body );
    ifrm = $( '#frm_data' );
    ifrm.ready( function () {
      ifrm.contents().find( "body" ).html( "" ).append( new_sample_data.body );
    } );
    }
    catch ( e ) {
      record_activity( 'error', 'Sample data Load', sample_data )
  }

}
