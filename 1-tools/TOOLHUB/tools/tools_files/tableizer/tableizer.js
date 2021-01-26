var cMeditor1, resulteditor;

function tableizer() {
  let data, t, a, i;
  data = cMeditor1.getValue();
  if ( 0 != data.trim().length ) {
    rows = "", thead = "<tr>", data = data.split( "\t" ).join( "," );
    t = Papa.parse( data ), a = t.data, i = a.slice( 1, a.length );
    i.sort( function ( e, t ) {
      return t.length - e.length
    } ), 0 == i.length && ( i = t.data );
    for ( var r = 0; r < i[ 0 ].length; r++ ) r < a[ 0 ].length ? thead += "<th>" + a[ 0 ][ r ] + "</th>" : thead += "<th>COLUMN" + ( r + 1 ) + "</th>";
    thead += "</tr>";
    for ( var o = 1; o < a.length; o++ ) {
      rows += "<tr>";
      for ( r = 0; r < i[ 0 ].length; r++ ) r < a[ o ].length ? rows += "<td>" + a[ o ][ r ] + "</td>" : rows += "<td>&nbsp</td>";
      rows += "</tr>";
    }
    var l = "",
      s = "";
    l = "<table class='table table-bordered'><thead class='thead-dark'>\n" + thead + "</thead><tbody>\n" + rows + "</tbody></table>";
    var n = document.getElementById( "frm_data" ).contentWindow.document,
      d = "<!DOCTYPE html><html>\n";
    d = ( d += '<head><meta charset="UTF-8"><title>Tableizer using ' + window.location.hostname + '</title>\n' ), d += "</head>\n", d += "<body>\n", d += l, d += "\n</body>\n", d += "</html>";
    n.open(), n.write( d ), n.close();
    resulteditor.setValue( vkbeautify.xml( d ) ), $( "html, body" ).animate( {
      scrollTop: 400
    }, 10 )
  }
}

function toggleHtml() {
  $( '#frm' ).toggleClass( 'd-none' );
  $( '#result-container' ).toggleClass( 'd-none' );
  $( '#show' ).toggleClass( 'd-none' );
  $( '#hide' ).toggleClass( 'd-none' );
}
$( document ).ready( function () {
  var ifrm = $( '#frm_data' );
  ifrm.ready( function () {
    ifrm.contents().find( "body" ).html( "" );
  } );
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    lineNumbers: true,
    smartIndent: true,
    autofocus: true,
  } );
  resulteditor = CodeMirror.fromTextArea( document.getElementById( "response" ), {
    mode: "htmlmixed",
    lineNumbers: true,
    tabSize: 2,
    indentUnit: 2,
    lineNumbers: !0,
    indentWithTabs: !1
  } );
  if ( window.FileReader ) {
    if ( $( '#filesJs' ).length > 0 ) {
      document.getElementById( 'filesJs' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files;
        var ignore_fileTypes = [ 'html', 'txt', 'css' ];
        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(),
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1;
          if ( isSuccess ) {
            for ( var i = 0, f; f = files[ i ]; i++ ) {
              var reader = new FileReader();
              reader.onload = function ( event ) {
                var contents = event.target.result;
                cMeditor1.setValue( contents );
              };
              reader.readAsText( f );
            }
            record_activity( 'tool_used', t_n, 'Browse Button Clicked' )
          } else {
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
}, cMeditor1, resulteditor );

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
              cMeditor1.setValue( e );
              record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Url ' + loadurl );
            } else if ( "danger" in obj ) {
              alert( 'Unable To Read Url' );
              var loadurl = $( '#url' ).val();
              record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read Url ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loadJsData()' );
            $( btn ).html( 'Load From Url' );
          } catch ( error ) {
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
