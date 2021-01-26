function loaddata() {
  var url, btn, ajax_url;
  if ( typeof ajax_uri === undefined ) {
    return false;
  }
  url = $( '#url' ).val();
  btn = $( '#loadurl' );
  ajax_url = ajax_uri;
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
              $( "#input-text" ).val( e );
              record_activity( 'tool_used', t_n, 'Success : AJAX Request Response Url ' + loadurl );
            } else if ( "danger" in obj ) {
              alert( 'Unable To Read Url' );
              var loadurl = $( '#url' ).val();
              record_activity( 'tool_used', t_n, 'Error : AJAX Request Unable To Read Url ' + loadurl );
            }
            $( btn ).attr( 'disabled', false );
            $( btn ).removeClass( 'btn-disabled' );
            $( btn ).attr( 'onclick', 'loaddata()' );
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

function loadSampledata() {
  if ( typeof sample_data != 'undefined' ) {
    $( '#input-text' ).val( sample_data );
  }
}

function loadSampleCM() {
  if ( typeof sample_data != 'undefined' && typeof cMeditor1 != 'undefined' ) {
    cMeditor1.setValue( sample_data );
  }
}
$( document ).ready( function () {
  if ( window.FileReader ) {
    if ( $( '#files' ).length > 0 ) {
      document.getElementById( 'files' ).addEventListener( 'change', handleFileSelect, false );

      function handleFileSelect( evt ) {
        var files = evt.target.files;
        var ignore_fileTypes = [ 'html', 'txt' ];
        if ( files && files[ 0 ] ) {
          var extension = files[ 0 ].name.split( '.' ).pop().toLowerCase(),
            isSuccess = ignore_fileTypes.indexOf( extension ) > -1;
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
} )

function copyFromEditor( cME ) {
  let ClipBJS = new ClipboardJS( '#copy_result', {
    text: function ( trigger ) {
      return cME.getDoc().getValue();
    },
  } );
  copyAlert( ClipBJS );
}

function copyFromTextarea() {
  let ClipBJS = new ClipboardJS( '#copy_result', {
    text: function ( trigger ) {
      return $( '#result' ).val();
    },
  } );
  copyAlert( ClipBJS );
}

function copyAlert( ClipBJS ) {
  ClipBJS.on( 'success', function ( e ) {
    if ( e.text.trim() != '' ) textCopySuccess();
    ClipBJS.destroy();
  } );
}
$( '#copy_result' ).click( function () {
  if ( typeof resulteditor != "undefined" ) {
    copyFromEditor( resulteditor );
  } else {
    if ( $( '#result' ).length > 0 ) {
      copyFromTextarea();
    }
  }
} );
$( "#copycmyk,#copyhsv,#copyhex,#copyhsb,#copyrgb,#copyhsv" ).click( function () {
  var clipbordText = $( this ).data( 'clipboard-text' );
  if ( clipbordText ) textCopySuccess();
} );
textCopySuccess = async function () {
  await _makeToasts( 'success', {
    'heading': 'Success',
    'body': 'Text copied successfully'
  }, false, true, 60000 );
}
let _makeToasts = ( theme, msg = {
  'heading': '',
  'body': '',
  'icon': ''
}, destruct = true, autoHide = true, delay = 7000 ) => new Promise( ( accept, reject ) => {
  let options = {
    'primary': {
      'bg': 'bg-primary',
      'text': 'text-white',
      'icon': 'icon icon-bell',
      'heading': 'Alert',
    },
    'secondary': {
      'bg': 'bg-secondary',
      'text': 'text-white',
      'icon': 'icon icon-envelope-open',
      'heading': 'Alert',
    },
    'info': {
      'bg': 'bg-info',
      'text': 'text-white',
      'icon': 'icon icon-info-circle',
      'heading': 'Alert',
    },
    'warning': {
      'bg': 'bg-warning',
      'text': 'text-white',
      'icon': 'icon icon-exclamation-triangle',
      'heading': 'Alert',
    },
    'success': {
      'bg': 'bg-success',
      'text': 'text-white',
      'icon': 'icon icon-check-circle',
      'heading': 'Alert',
    },
    'danger': {
      'bg': 'bg-danger',
      'text': 'text-white',
      'icon': 'icon icon-ban',
      'heading': 'Alert',
    }
  };
  if ( theme.trim().length < 1 || !options.hasOwnProperty( theme ) )
    reject( 'Invalid Theme' );
  if ( !autoHide )
    destruct = false;
  let heading = options[ theme ].heading;
  let body = '';
  let icon = options[ theme ].icon;
  if ( msg.hasOwnProperty( 'heading' ) && msg.heading.trim().length > 0 ) {
    heading = msg.heading.trim();
  }
  if ( msg.hasOwnProperty( 'body' ) && msg.body.trim().length > 0 ) {
    body = msg.body.trim();
  } else {
    reject( 'Invalid body' );
  }
  if ( msg.hasOwnProperty( 'icon' ) && msg.icon.trim().length > 0 ) {
    icon = msg.icon.trim();
  }
  uniqueId().then( ( toast_id ) => {
    let toast = '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="' + autoHide + '" data-delay="' + delay + '" id="' + toast_id + '">\n' +
      ' <div class="toast-header ' + options[ theme ].bg + ' ' + options[ theme ].text + '">\n' +
      ' <strong class="mr-auto"><i class="' + icon + '"></i> ' + heading + '</strong>\n' +
      ' <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">\n' +
      ' <span aria-hidden="true">&times;</span>\n' +
      ' </button>\n' +
      ' </div>\n' +
      ' <div class="toast-body">\n' +
      ' ' + body + '\n' +
      ' </div>\n' +
      ' </div>';
    $( '#toasts_container' ).append( toast );
    $( '#' + toast_id ).toast( 'show' );
    if ( destruct ) {
      setTimeout( function () {
        $( '#' + toast_id ).remove();
      }, ( delay + 500 ) );
    }
    accept( toast_id );
  } ).catch( ( error ) => {
    reject( 'Some error has occurred while making Toast.' );
  } );
} );
let uniqueId = ( str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890", len = 7 ) => new Promise( ( accept, reject ) => {
  if ( str.trim().length < 1 ) {
    reject( 'Invalid string' );
  }
  if ( len < 1 ) {
    reject( 'Invalid length' );
  }
  let strArr = str.split( '' );
  let resArr = [];
  for ( let i = 0; i < len; i++ ) {
    resArr.push( strArr[ Math.floor( Math.random() * strArr.length ) ] );
  }
  accept( resArr.join( "" ) );
} );
