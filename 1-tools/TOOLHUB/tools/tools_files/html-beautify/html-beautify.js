var cMeditor1, resulteditor;
$( document ).ready( function () {
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    mode: "htmlmixed",
    lineNumbers: true,
    tabSize: 2,
    indentUnit: 2,
    lineNumbers: !0,
    indentWithTabs: !1
  } );
  resulteditor = CodeMirror.fromTextArea( document.getElementById( "result" ), {
    mode: "htmlmixed",
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
  $( 'input[class$="opts"],#wrap-attributes,#indent-scripts,#brace-style,#wrap-line-length,#max-preserve-newlines,#tabsize' ).change( seteditor_options );
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
        var files = evt.target.files;
        var ignore_fileTypes = [ 'html', 'htm' ];
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

function seteditor_options() {
  var opts = {};
  opts.indent_size = $( '#tabsize' ).val();
  opts.indent_char = parseInt( opts.indent_size, 10 ) === 1 ? '\t' : ' ';
  result_indent_scripts = [ $( '#indent-scripts' ).val() ];
  opts.indent_scripts = result_indent_scripts;
  opts.brace_style = $( '#brace-style' ).val() + ( $( '#brace-preserve-inline' ).prop( 'checked' ) ? ",preserve-inline" : "" );
  opts.wrap_line_length = $( '#wrap-line-length' ).val();
  opts.max_preserve_newlines = $( '#max-preserve-newlines' ).val();
  opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
  opts.wrap_attributes = $( '#wrap-attributes' ).val();
  opts.end_with_newline = $( '#end-with-newline' ).prop( 'checked' );
  opts.indent_inner_html = $( '#indent-inner-html' ).prop( 'checked' );
  store_settings_to_cookie();
  var e = cMeditor1.getValue();
  resulteditor.setValue( html_beautify( e, opts ) );
}

function returnAnyValue( a, b ) {
  if ( a != "undefined" && a != "null" && typeof a !== undefined && typeof a !== null && a != '' ) {
    return a;
  }
  return b;
}

function read_settings_from_cookie() {
  $( '#tabsize' ).val( returnAnyValue( Cookies.get( 'tabsize' ), '4' ) );
  $( '#indent-scripts' ).val( returnAnyValue( Cookies.get( 'indent-scripts' ), "normal" ) );
  $( '#brace-style' ).val( returnAnyValue( Cookies.get( 'brace-style' ), 'collapse' ) );
  $( '#wrap-line-length' ).val( returnAnyValue( Cookies.get( 'wrap-line-length' ), '0' ) );
  $( '#max-preserve-newlines' ).val( returnAnyValue( Cookies.get( 'max-preserve-newlines' ), '5' ) );
  $( '#wrap-attributes' ).val( returnAnyValue( Cookies.get( 'wrap-attributes' ), 'auto' ) );
  $( '#end-with-newline' ).prop( 'checked', Cookies.get( 'end-with-newline' ) === 'on' );
  $( '#indent-inner-html' ).prop( 'checked', Cookies.get( 'indent-inner-html' ) === 'on' );
}

function store_settings_to_cookie() {
  var opts = {
    expires: 360
  };
  Cookies.set( 'tabsize', $( '#tabsize' ).val(), opts );
  Cookies.set( 'wrap-line-length', $( '#wrap-line-length' ).val(), opts );
  Cookies.set( 'indent-scripts', $( '#indent-scripts' ).val(), opts );
  Cookies.set( 'max-preserve-newlines', $( '#max-preserve-newlines' ).val(), opts );
  Cookies.set( 'brace-style', $( '#brace-style' ).val(), opts );
  Cookies.set( 'wrap-attributes', $( '#wrap-attributes' ).val(), opts );
  Cookies.set( 'end-with-newline', $( '#end-with-newline' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'indent-inner-html', $( '#indent-inner-html' ).prop( 'checked' ) ? 'on' : 'off', opts );
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
