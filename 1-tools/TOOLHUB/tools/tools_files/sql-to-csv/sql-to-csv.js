var cMeditor1, textCopySuccess;

async function convertToCsv() {
  let vav = '';
  vav = cMeditor1.getValue();
  if ( $.trim( vav ) == '' ) return false;
  try {
    if ( null != vav && 0 != vav.trim().length ) {
      if ( -1 == vav.toLowerCase().search( "create" ) ) return cMeditor1.setValue( "Missing CREATE STATEMENT" ), !1;
      if ( -1 == vav.toLowerCase().search( "select" ) ) return cMeditor1.setValue( "Missing SELECT STATEMENT" ), !1;
      const SQL = await initSqlJs( {
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.2.2/dist/${file}`
      } );
      var r = ( new SQL.Database ).exec( vav ),
        o = "";
      $.each( r, function ( e, t ) {
            1 != r.length && ( o += "TABLE " + ( e + 1 ) + "\n", o += "-------\n" ), o += t.columns.join() + "\n", $.each( t.values, function ( e, t ) {
          o += t.join() + "\n"
        } ), 1 != r.length && ( o += "-------\n" )
        } ), $( '#result' ).val( o );
    }
  } catch ( e ) {
    console.log( e );
  }

}



$( document ).ready( function () {
  editorSelector = '#result';
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    matchBrackets: true,
    autoCloseBrackets: true,
    mode: "text/x-sql",
    lineWrapping: true,
    lineNumbers: true,

  } );
  CodeMirror.commands[ "selectAll" ]( cMeditor1 );
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

}, cMeditor1, textCopySuccess );

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
