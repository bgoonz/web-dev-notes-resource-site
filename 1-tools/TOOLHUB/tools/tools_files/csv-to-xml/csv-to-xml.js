let resulteditor;
function autoFormat( lines ) {
  let eidtor;
  eidtor = {
      from: {
        line: "0",
        ch: "0",
        sticky: null
      },
      to: {
        line: lines,
        ch: "0",
        sticky: null
    }
  }
  resulteditor.autoFormatRange( eidtor.from, eidtor.to );
  }

  function convertToXml() {
    let input, inputVal, lines_array, lines_array_length, headers, headers_array, headers_array_length, resultCollector, linesLength;
    input = $( '#input-text' );
  inputVal = input.val();
  linesLength = 0;
  resultCollector = '';
  resultCollector += "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>";
  linesLength++
  resultCollector += "<root>";
  linesLength++


  if ( $.trim( inputVal ) != '' ) {

    lines_array = inputVal.split( "\n" );
    lines_array_length = lines_array.length;
    resulteditor.mode = "htmlmixed";

    if ( lines_array_length > 1 ) {
      //headers
      headers = lines_array[ 0 ];
      headers_array = headers.split( ',' );

      headers_array_length = headers_array.length;

      for ( let i = 1; i < lines_array_length; i++ ) {

        let currentIndex, currentIndexArray, tagFromHeader, tag_counter, tag_html;
        tag_counter = i - 1;
        tag_html = "<" + tag_counter + ">\n";
        linesLength++;
        currentIndex = lines_array[ i ];
        currentIndexArray = currentIndex.split( ',' );

        for ( let h = 0; h < headers_array_length; h++ ) {

          tagFromHeader = "<" + headers_array[ h ] + ">\n";
          linesLength++;

          if ( void 0 !== currentIndexArray[ h ] ) {
            tagFromHeader += currentIndexArray[ h ] + "\n";
            linesLength++;
          }
          tagFromHeader += "</" + headers_array[ h ] + ">\n";
          linesLength++;

          tag_html += tagFromHeader;
        }
        tag_html += "</" + tag_counter + ">\n";
        linesLength++;
        resultCollector += tag_html;
      }
    }
    resultCollector += "</root>";
    linesLength++
    resulteditor.setValue( resultCollector );
    autoFormat( linesLength );
  }
}
function CSVToArray( r, e ) {
  e = e || ",";

  for ( var n = new RegExp( "(\\" + e + '|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\' + e + "\\r\\n]*))", "gi" ), g = [
      []
    ], a = null;
    a = n.exec( r ); ) {
      var l = a[ 1 ];
      if ( l.length && l != e && g.push( [] ), a[ 2 ] ) var t = a[ 2 ].replace( new RegExp( '""', "g" ), '"' );
      else t = a[ 3 ];
      g[ g.length - 1 ].push( t )
  }
  return g
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
    lineNumbers: true,
    mode: "htmlmixed"

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
