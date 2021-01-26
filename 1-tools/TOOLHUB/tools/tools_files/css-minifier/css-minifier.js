var cMeditor1, resulteditor;
$( document ).ready( function () {
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    mode: "css",
    lineNumbers: true,
    tabSize: 2,
    indentUnit: 2,
    lineNumbers: !0,
    indentWithTabs: !1
  } );
  resulteditor = CodeMirror.fromTextArea( document.getElementById( "response" ), {
    mode: "css",
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

function minify_css() {
  if ( typeof ajax_uri === undefined ) {
    return false;
  }
  if ( $.trim( cMeditor1.getValue() ) != "" ) {
    var sendData = {};
    var text = JSON.stringify( cMeditor1.getValue() );
    sendData.text = text;
    var ajax_url = ajax_uri;
    if ( $.trim( ajax_url ) != '' ) {
      $.ajax( {
        url: ajax_url,
        type: "POST",
        data: sendData,
        beforeSend: function () {
          $( '#convert_btn' ).html( '<span class="icon icon-cog icon-spin"></span> Loading ' );
          $( '#convert_btn' ).attr( 'disabled', true );
          $( '#convert_btn' ).addClass( 'btn-disabled' );
        },
        success: function ( data, textStatus, xhr ) {
          if ( $.trim( data ) != '' ) {
            try {
              resulteditor.setValue( JSON.parse( data ) );
              record_activity( 'tool_used', t_n, "Minified version loaded successfully" );
              $( '#convert_btn' ).attr( 'disabled', false );
              $( '#convert_btn' ).removeClass( 'btn-disabled' );
              $( '#convert_btn' ).html( 'Load From Url' );
            } catch ( error ) {
              record_activity( 'tool_used', t_n, 'parseJSON error mini html result return' );
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
