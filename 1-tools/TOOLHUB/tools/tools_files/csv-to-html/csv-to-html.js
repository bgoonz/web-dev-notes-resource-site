var resulteditor;
function viewManager( e ) {
  let iframeContainer, cmContainer;
  iframeContainer = $( '#iframeContainer' );
  cmContainer = $( '#editorContainer' );
  input = $( '#input-text' );
  inputVal = input.val();
  if ( inputVal.trim() == '' ) return false;

  if ( e == "iframe" ) {
    cmContainer.addClass( 'd-none' );
    iframeContainer.removeClass( 'd-none' );
  } else if ( e == "editor" ) {
    iframeContainer.addClass( 'd-none' );
    cmContainer.removeClass( 'd-none' );
  }
}

function updateSourceAndView( e, t, o ) {
  if ( null == e ? ( i = $( '#input-text' ).val() ) : i = e, 0 != i.trim().length ) {
    var a = "",
      n = "<tr>",
      r = Papa.parse( i ),
      l = r.data,
      s = l.slice( 1, l.length );
      s.sort( function ( e, t ) {
      return t.length - e.length
    } ), 0 == s.length && ( s = r.data );
    for ( var d = 0; d < s[ 0 ].length; d++ ) d < l[ 0 ].length ? n += "<th>" + l[ 0 ][ d ] + "</th>" : n += "<th>COLUMN" + ( d + 1 ) + "</th>";
    n += "</tr>";
    for ( var c = 1; c < l.length; c++ ) {
      a += "<tr>";
      for ( d = 0; d < s[ 0 ].length; d++ ) d < l[ c ].length ? a += "<td>" + l[ c ][ d ] + "</td>" : a += "<td>&nbsp</td>";
      a += "</tr>";
    }
    var u = "<div class='table-responsive'> <table class='table'><thead class='thead-dark'>\n" + n + "</thead><tbody>\n" + a + "</tbody></table></div>";
    if ( void 0 !== o && 1 == o ) return u;

    htmlOutput( u );
  }
}
function convertToHtmlTable( actionToggle ) {
  viewManager( actionToggle );
  updateSourceAndView();
}
function convertToRawHtml( actionToggle ) {
  viewManager( actionToggle );
  updateSourceAndView();
}

function htmlOutput( e ) {

  var r = e;
  if ( null != r && 0 < r.trim().length ) {
    var n = "<!DOCTYPE html><html>\n";
    n = n + "<head><meta charset='UTF-8'><title>CSV To HTML using </title></head>\n";
    n += "<body>\n";
    n += r;
    n += "\n</body>\n";
    n += "</html>";
    resulteditor.setValue( n );
    var previewFrame = document.getElementById( 'html-view' );
    previewFrame.innerHTML = r;
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
            obj = $.parseJSON( data );
            if ( "success" in obj ) {

              $( '#loadFromUrl' ).modal( "hide" );
              var e = obj.success;

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


$( document ).ready( function () {

  resulteditor = CodeMirror.fromTextArea( document.getElementById( "result" ), {
    matchBrackets: true,
    autoCloseBrackets: true,
      mode: "application/ld+json",
      lineWrapping: true,
    lineNumbers: true,
  } );
  CodeMirror.commands[ "selectAll" ]( resulteditor );
  if ( window.FileReader ) {

    if ( $( '#filesJs' ).length > 0 ) {
      document.getElementById( 'filesJs' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object
        var ignore_fileTypes = [ 'csv' ];
        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(), //file extension from input file
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1; //is extension not  in acceptable types
          if ( isSuccess ) {
            for ( var i = 0, f; f = files[ i ]; i++ ) {
              var reader = new FileReader();
              reader.onload = function ( event ) {
                var contents = event.target.result;
                $( '#input-text' ).val( contents );
              };
              reader.readAsText( f );
            }
            record_activity( 'tool_used', t_n, 'Browse Button Clicked' )
            }
            else {
              alert( 'File Type Not Supported' );
          }
        }
        return false;
      }
    }
  } else {
    record_activity( 'tool_used', t_n, 'window.FileReader support not available' );
    alert( 'file support not available' );

  }

}, resulteditor );
