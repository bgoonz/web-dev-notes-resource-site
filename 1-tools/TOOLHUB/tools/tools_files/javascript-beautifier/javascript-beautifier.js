var cMeditor1, resulteditor;
$( document ).ready( function () {
  //var myTextarea = $("#input-text");

  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    mode: "javascript",
    lineNumbers: true,
    tabSize: 2,
    indentUnit: 2,
    lineNumbers: !0,
    indentWithTabs: !1
  } );
  resulteditor = CodeMirror.fromTextArea( document.getElementById( "result" ), {
    mode: "javascript",
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
  $( 'input[class$="opts"],#brace-style,#wrap-line-length,#max-preserve-newlines,#tabsize' ).change( seteditor_options );

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

        var ignore_fileTypes = [ 'html', 'txt', 'js' ];

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
  opts.max_preserve_newlines = $( '#max-preserve-newlines' ).val();
  opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
  opts.indent_scripts = $( '#indent-scripts' ).val();
  // opts.brace_style = "collapse";
  opts.brace_style = [ $( '#brace-style' ).val(), ( $( '#brace-preserve-inline' ).prop( 'checked' ) ? "preserve-inline" : "none" ) ];
  opts.wrap_line_length = $( '#wrap-line-length' ).val();
  opts.space_before_conditional = $( '#space-before-conditional' ).prop( 'checked' );
  opts.unescape_strings = $( '#unescape-strings' ).prop( 'checked' );
  opts.jslint_happy = $( '#jslint-happy' ).prop( 'checked' );
  opts.keep_array_indentation = $( '#keep-array-indentation' ).prop( 'checked' );
  opts.break_chained_methods = $( '#break-chained-methods' ).prop( 'checked' );
  opts.end_with_newline = $( '#end-with-newline' ).prop( 'checked' );
  opts.indent_inner_html = $( '#indent-inner-html' ).prop( 'checked' );
  opts.comma_first = $( '#comma-first' ).prop( 'checked' );
  opts.e4x = $( '#e4x' ).prop( 'checked' );
  var e = cMeditor1.getValue();
  if ( $( '#detect-packers' ).prop( 'checked' ) ) {
    e = unpacker_filter( e );
  }
  resulteditor.setValue( js_beautify( e, opts ) );
}

function unpacker_filter( source ) {
  var leading_comments = '',
    comment = '',
    unpacked = '',
    found = false;

  // cuts leading comments
  do {
    found = false;
    if ( /^\s*\/\*/.test( source ) ) {
      found = true;
      comment = source.substr( 0, source.indexOf( '*/' ) + 2 );
      source = source.substr( comment.length );
      leading_comments += comment;
    } else if ( /^\s*\/\//.test( source ) ) {
      found = true;
      comment = source.match( /^\s*\/\/.*/ )[ 0 ];
      source = source.substr( comment.length );
      leading_comments += comment;
    }
  }
  while ( found );
  leading_comments += '\n';
  source = source.replace( /^\s+/, '' );

  var unpackers = [ P_A_C_K_E_R, Urlencoded, JavascriptObfuscator /*, MyObfuscate*/ ];
  for ( var i = 0; i < unpackers.length; i++ ) {
    if ( unpackers[ i ].detect( source ) ) {
      unpacked = unpackers[ i ].unpack( source );
      if ( unpacked !== source ) {
        source = unpacker_filter( unpacked );
      }
    }
  }

  return leading_comments + source;
}

function returnAnyValue( a, b ) {
  if ( a != "undefined" && a != "null" && typeof a !== undefined && typeof a !== null && a != '' ) {
    return a;
  }
  return b;
}

function read_settings_from_cookie() {
  $( '#tabsize' ).val( returnAnyValue( Cookies.get( 'tabsize' ), '4' ) );
  $( '#brace-style' ).val( returnAnyValue( Cookies.get( 'brace-style' ), 'collapse' ) );
  $( '#detect-packers' ).prop( 'checked', Cookies.get( 'detect-packers' ) !== 'off' );
  $( '#max-preserve-newlines' ).val( returnAnyValue( Cookies.get( 'max-preserve-newlines' ), '5' ) );
  $( '#keep-array-indentation' ).prop( 'checked', Cookies.get( 'keep-array-indentation' ) === 'on' );
  $( '#break-chained-methods' ).prop( 'checked', Cookies.get( 'break-chained-methods' ) === 'on' );
  $( '#indent-scripts' ).val( returnAnyValue( Cookies.get( 'indent-scripts' ), 'normal' ) );
  $( '#additional-options' ).val( returnAnyValue( Cookies.get( 'additional-options' ), '{}' ) );
  $( '#space-before-conditional' ).prop( 'checked', Cookies.get( 'space-before-conditional' ) !== 'off' );
  $( '#wrap-line-length' ).val( returnAnyValue( Cookies.get( 'wrap-line-length' ), '0' ) );
  $( '#unescape-strings' ).prop( 'checked', Cookies.get( 'unescape-strings' ) === 'on' );
  $( '#jslint-happy' ).prop( 'checked', Cookies.get( 'jslint-happy' ) === 'on' );
  $( '#end-with-newline' ).prop( 'checked', Cookies.get( 'end-with-newline' ) === 'on' );
  $( '#indent-inner-html' ).prop( 'checked', Cookies.get( 'indent-inner-html' ) === 'on' );
  $( '#comma-first' ).prop( 'checked', Cookies.get( 'comma-first' ) === 'on' );
  $( '#e4x' ).prop( 'checked', Cookies.get( 'e4x' ) === 'on' );
  $( '#language' ).val( returnAnyValue( Cookies.get( 'language' ), 'auto' ) );
}

function store_settings_to_cookie() {
  var opts = {
    expires: 180
  };
  Cookies.set( 'tabsize', $( '#tabsize' ).val(), opts );
  Cookies.set( 'brace-style', $( '#brace-style' ).val(), opts );
  Cookies.set( 'detect-packers', $( '#detect-packers' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'max-preserve-newlines', $( '#max-preserve-newlines' ).val(), opts );
  Cookies.set( 'keep-array-indentation', $( '#keep-array-indentation' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'break-chained-methods', $( '#break-chained-methods' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'space-before-conditional', $( '#space-before-conditional' ).prop( 'checked' ) ? 'on' : 'off',
    opts );
  Cookies.set( 'unescape-strings', $( '#unescape-strings' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'jslint-happy', $( '#jslint-happy' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'end-with-newline', $( '#end-with-newline' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'wrap-line-length', $( '#wrap-line-length' ).val(), opts );
  Cookies.set( 'indent-scripts', $( '#indent-scripts' ).val(), opts );
  Cookies.set( 'additional-options', $( '#additional-options' ).val(), opts );
  Cookies.set( 'indent-inner-html', $( '#indent-inner-html' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'comma-first', $( '#comma-first' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'e4x', $( '#e4x' ).prop( 'checked' ) ? 'on' : 'off', opts );
  Cookies.set( 'language', $( '#language' ).val(), opts );

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
