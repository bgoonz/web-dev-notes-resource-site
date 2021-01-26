var cMeditor1;
$( document ).ready( function () {

  // create the editor
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    mode: "application/xml",
    lineNumbers: true,
    smartIndent: true,
    matchBrackets: true,
    autofocus: true,
    alignCDATA: true,

  } );



  if ( window.FileReader ) {
    //needed to be fixed
    if ( $( '#filesJson' ).length > 0 ) {
      document.getElementById( 'filesJson' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files; // FileList object

        var ignore_fileTypes = [ 'html', 'txt', 'json', 'xml' ];

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
            }
            else {
              alert( 'File Type Not Supported' );
          }
        }
        return false;
      }
    }


  } else {
    //the browser doesn't support the FileReader Object, so do this
    record_activity( 'tool_used', t_n, 'window.FileReader support not available' );

    alert( 'file support not available' );
    //alert('file reader not supported in this browser');
  }
}, cMeditor1 );

function convert_to_csv() {
  if ( 0 == cMeditor1.getValue().trim().length ) return setMessage( "error", "Input text are in Empty" ), !1;
  e = cMeditor1.getValue().trim();
  try {

    t = $.parseXML( e );
    e = ( new X2JS ).xml2json( t );
    csv = convertObj2Csv( e ).trim();
    $( '#result' ).val( csv );

  } catch ( e ) {
    $( '#result' ).val( 'unable to solve the puzzle' );
  }
}




function convertObj2Csv( obj ) {
  var tempArr = [];
  var resArr = [];
  if ( Object.keys( obj ).length > 0 ) {
    for ( val of Object.values( obj ) ) {
      if ( val instanceof Object ) {
        resArr.push( convertObj2Csv( val ) );
      } else {
        tempArr.push( val );
      }
    }
    if ( tempArr.length > 0 ) {
      resArr.push( tempArr.join( ',' ) );
    }
  }
  return resArr.join( "\n" );
}
function loadJsonData() {

  if ( typeof ajax_uri === undefined ) {
    return false;
  }
  var url = $( '#url' ).val();
  var btn = $( '#loadurl' );
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
            obj = $.parseJSON( data )
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
            $( btn ).attr( 'onclick', 'loadJsonData()' );
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
