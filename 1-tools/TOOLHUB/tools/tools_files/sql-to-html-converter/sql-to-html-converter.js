var cMeditor1, resulteditor;

async function convertToHtml() {
  var data = cMeditor1.getValue();
  if ( data != "" ) {
    try {
      if ( data.toLowerCase().search( "create" ) == -1 ) {
        resulteditor.setValue( "You are missing CREATE statement." );
        return false;
      } else if ( data.toLowerCase().search( "select" ) == -1 ) {
        resulteditor.setValue( "You are missing SELECT statement." );
        return false;
      }
      const SQL = await initSqlJs( {
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.2.2/dist/${file}`
      } );
      db = new SQL.Database();
      res = db.exec( data );

      htmlData = "";
      $.each( res, function ( i, value ) {
            if ( res.length != 1 ) {
          htmlData += "<table>";
        }
        htmlData += "<table><thead><tr>";
        for ( var j = 0; j < value.columns.length; j++ ) {
          htmlData += "<th>" + value.columns[ j ] + "</th>";
        }
        htmlData += "</tr></thead><tbody>";
        $.each( value.values, function ( k, value1 ) {
          htmlData += "<tr>";
          $.each( value1, function ( l, data ) {
            htmlData += "<td>" + data + "</td>";
          } );
          htmlData += "</tr>";
        } );
        htmlData += "</tbody></table>";
        if ( res.length != 1 ) {
          htmlData += "</table>";
        }
      } );
      resulteditor.setValue( html_beautify( htmlData ) );

    } catch ( e ) {
      resulteditor.setValue( "Sorry --" );
      resulteditor.setValue( e );

    }
  }
}
$( document ).ready( function () {


  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    mode: "text/x-mysql",
    lineNumbers: true,
    smartIndent: true,
    matchBrackets: true,
    autofocus: true,
    extraKeys: {
      "Ctrl-Space": "autocomplete"
    },
    hintOptions: {
      tables: {
        users: [ "name", "score", "birthDate" ],
          countries: [ "name", "population", "size" ]
      }
    }
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
        var files = evt.target.files; // FileList object

        var ignore_fileTypes = [ 'html', 'txt', 'css' ];

        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(), //file extension from input file
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1; //is extension not  in acceptable types
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
