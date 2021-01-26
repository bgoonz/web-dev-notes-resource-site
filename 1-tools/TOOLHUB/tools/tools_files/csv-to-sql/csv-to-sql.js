var handleFileSelect, row_collector, sendNewRequest, resulteditor;
$( document ).ready( function () {

  resulteditor = CodeMirror.fromTextArea( document.getElementById( "result" ), {
    matchBrackets: true,
    autoCloseBrackets: true,
      mode: "text/x-sql",
      lineWrapping: true,
    lineNumbers: true
  } );
  CodeMirror.commands[ "selectAll" ]( resulteditor );



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

  $( '#input-text,#tname,#cDate,#dateFormat' ).change( () => sendNewRequest = true );
  }, row_collector, handleFileSelect, sendNewRequest, resulteditor )
sendNewRequest = true;
function download_file() {

  if ( $.trim( row_collector ) != '' ) {
    var file = new File( [ row_collector ], "url-decode.com.csv", {
      type: "text/plain;charset=utf-8"
    } );
    saveAs( file );
  }
}

var lastRequestData = false;

async function convertToSqlInsert() {
  if ( sendNewRequest ) {
    lastRequestData = await convertToSql()
  };
  if ( typeof lastRequestData.c != 'undefined' ) {
    sendNewRequest = false;
  }
  let result_data = lastRequestData.c;
  result_data += lastRequestData.insert;
  resulteditor.setValue( result_data );



}
async function convertToSqlUpdate() {
    if ( sendNewRequest ) {
      lastRequestData = await convertToSql()
    };
    if ( typeof lastRequestData.c != 'undefined' ) {
    sendNewRequest = false;
  }
  resulteditor.setValue( lastRequestData.update );


}
async function convertToSqlDelete() {
    if ( sendNewRequest ) {
      lastRequestData = await convertToSql()
    };
    if ( typeof lastRequestData.c != 'undefined' ) {
    sendNewRequest = false;
  }
  resulteditor.setValue( lastRequestData.delete );

  }

function convertToSql() {
  if ( typeof ajax_uri === undefined ) {
    return false;
  }
  let btn, ajax_url, data, inputVal, foundDate, formateDate, table_name;
  inputVal = $( '#input-text' ).val();
  if ( $.trim( inputVal ) == '' ) {
    return false;
  }

  btn = $( '#convertBtn' );
  btn.attr( 'disabled', true );



  ajax_url = ajax_uri;
  foundDate = $( '#cDate' ).prop( 'checked' );
  formateDate = $( '#dateFormat' ).val();
  table_name = $( '#tname' ).val();



  return new Promise( ( resolve, reject ) => {
        if ( $.trim( ajax_url ) != '' ) {

      data = {
        'val': inputVal,
        'cdate': foundDate,
        'fmDate': formateDate,
        't_name': table_name
      };
      $.ajax( {
        url: ajax_url,
        type: 'POST',
        dataType: 'json',
        data: data,

        success: function ( data ) {
            btn.attr( 'disabled', false );

          resolve( data );
        }

      } );
    }
  } );



}
