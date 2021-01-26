var cMeditor1;
$( document ).ready( function () {
  cMeditor1 = CodeMirror.fromTextArea( document.getElementById( "input-text" ), {
    extraKeys: {
      "Ctrl-Space": "autocomplete"
    },
    mode: "text/css",
    lineNumbers: true,
    smartIndent: true,
    matchBrackets: true,
    autofocus: true,
    gutters: [ 'CodeMirror-lint-markers' ],
    lint: true
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
}, cMeditor1 );
var storage;
var fail;
var uid;
var errorLines = [];
try {
  uid = new Date;
  ( storage = window.localStorage ).setItem( uid, uid );
  fail = storage.getItem( uid ) != uid;
  storage.removeItem( uid );
  fail && ( storage = false );
} catch ( exception ) {}
var options = [];
if ( storage ) {
  var cssLintOpt = localStorage.getItem( 'cssLintOpt' );
  if ( undefined !== typeof cssLintOpt ) {
    if ( cssLintOpt ) {
      cssLintOpt.split( ',' ).map( ( val ) => {
        $( 'input[value="' + val + '"]' ).prop( 'checked', true ), options.push( val )
      } )
    }
  }
}

function update( e ) {
  if ( $( e ).is( ':checked' ) ) {
    if ( options.indexOf( e.value ) == -1 ) {
      options.push( e.value );
    }
  } else {
    if ( options.indexOf( e.value ) > -1 ) {
      options = options.filter( ( val => val != e.value ) )
    }
  }
  if ( options.length >= 0 ) {
    if ( storage ) {
      localStorage.setItem( 'cssLintOpt', options )
    }
  }
}

function lintInit() {
  var css = cMeditor1.getValue();
  outputResults( CSSLint.verify( css, options ) )
}
var errorView;

function errorTableInit() {
  $( "#lint-result" ).removeClass( 'd-none' );
  errorView = $( "#errorView" ).dataTable( {
    data: trDataCollect,
    "bDestroy": true,
    "bPaginate": true,
    "bLengthChange": false,
    "bFilter": true,
    "bSort": true,
    "bInfo": false,
    "bAutoWidth": true,
    "Columns": [ {
      "title": "",
      "sType": "string"
    }, {
      "title": "line",
      "sType": "numeric"
    }, {
      "title": "column",
      "sType": "numeric"
    }, {
      "title": "title",
      "sType": "string"
    }, {
      "title": "description",
      "sType": "string"
    }, {
      "title": "browser",
      "sType": "string"
    }, ]
  } );
  $( '.dataTables_filter' ).addClass( 'float-right' );
}
var trDataCollect = Array();

function outputResults( results ) {
  var i, messages, len, errorCount = 0,
    warningCount = 0,
    tr, type;
  if ( errorView ) {
    errorView.fnClearTable();
  }
  messages = results.messages;
  trDataCollect = Array();
  for ( i = 0, len = messages.length; i < len; i++ ) {
    var singleTr = Array();
    if ( messages[ i ].type === "error" ) {
      errorCount++;
      type = "<i class='icon icon-times icon-danger' aria-hidden=\"true\"></i>";
    } else if ( messages[ i ].type === "warning" ) {
      warningCount++;
      type = "<span><i class='icon icon-exclamation-circle icon-warning' aria-hidden=\"true\"></i></span>";
    }
    singleTr.push( type );
    singleTr.push( typeof messages[ i ].line === "number" ? messages[ i ].line : "(rollup)" );
    singleTr.push( typeof messages[ i ].col === "number" ? messages[ i ].col : "(rollup)" );
    singleTr.push( htmlEscape( messages[ i ].rule.name ) );
    singleTr.push( htmlEscape( messages[ i ].message ) + ( messages[ i ].evidence ? "<pre>" + messages[ i ].evidence + "</pre>" : "" ) );
    singleTr.push( messages[ i ].rule.browsers );
    trDataCollect.push( singleTr );
  }

  function htmlEscape( text ) {
    var htmlEscapes = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "\"": "&quot;"
    };
    return text.replace( /[<>"&]/g, function ( c ) {
      return htmlEscapes[ c ];
    } );
  }
  errorTableInit();
  $( ".errorCount" ).text( errorCount );
  $( ".warningCount" ).text( warningCount );
  if ( errorCount === 0 && warningCount === 0 ) {
    $( "#fix-it" ).hide();
  } else {
    $( "#fix-it" ).show();
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
