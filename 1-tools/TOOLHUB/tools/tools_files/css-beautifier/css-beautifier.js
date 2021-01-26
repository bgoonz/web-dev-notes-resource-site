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
  resulteditor = CodeMirror.fromTextArea( document.getElementById( "result" ), {
        mode: "css",
    lineNumbers: true,
    tabSize: 2,
    indentUnit: 2,
    lineNumbers: !0,
    indentWithTabs: !1
  } );

  var t = null;
  cMeditor1.on( "change", function ( e ) {
    t && clearTimeout( t ), t = setTimeout( function () {
      t = null, validateJs( null );
    }, 200 );
  } );
  $( 'input[class$="opts"],#tabsize' ).change( seteditor_options );

  read_settings_from_cookie();
  seteditor_options();


  $( ".plus-minus" ).click( function () {
        var ch = $( this ).children();
        if ( $( ch ).find( "i" ).length > 0 ) {
          var p = $( ch ).find( "i" );
          if ( p.hasClass( "icon-plus" ) ) {
            $( p ).removeClass( "icon-plus" );
            $( p ).addClass( "icon-minus" );
          } else {
            $( p ).addClass( "icon-plus" );
            $( p ).removeClass( "icon-minus" );
      }
    }
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
}, cMeditor1, resulteditor );

function seteditor_options() {

  store_settings_to_cookie();
  var opts = {};

  opts.indent_size = $( '#tabsize' ).val();
  opts.indent_char = parseInt( opts.indent_size, 10 ) === 1 ? '\t' : ' ';
  opts.end_with_newline = $( '#end-with-newline' ).prop( 'checked' );
  opts.selector_separator_newline = $( '#selector-separator-newline' ).prop( 'checked' );
  opts.newline_between_rules = $( '#newline-between-rules' ).prop( 'checked' );
  var e = cMeditor1.getValue();
  if ( $( '#detect-packers' ).prop( 'checked' ) ) {
    e = unpacker_filter( e );
  }
  resulteditor.setValue( css_beautify( e, opts ) );
}

function returnAnyValue( a, b ) {
  if ( a != "undefined" && a != "null" && typeof a !== undefined && typeof a !== null && a != '' ) {
    return a;
  }
  return b;
}
function read_settings_from_cookie() {
  $( '#tabsize' ).val( returnAnyValue( Cookies.get( 'tabsize' ), '4' ) );
  $( '#end-with-newline' ).prop( 'checked', Cookies.get( 'end-with-newline' ) !== 'off' );
  $( '#selector-separator-newline' ).prop( 'checked', Cookies.get( 'selector-separator-newline' ) !== 'off' );
  $( '#newline_between_rules' ).prop( 'checked', Cookies.get( 'newline_between_rules' ) !== 'off' );
}

function store_settings_to_cookie() {
  var opts = {
    expires: 180
  };
  Cookies.set( 'tabsize', $( '#tabsize' ).val(), opts );


  Cookies.set( 'end-with-newline', $( '#end-with-newline' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'selector-separator-newline', $( '#selector-separator-newline' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'newline_between_rules', $( '#newline_between_rules' ).prop( 'checked' ) ? 'on' : 'off', opts );
}

function validateJs() {
  seteditor_options();
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
